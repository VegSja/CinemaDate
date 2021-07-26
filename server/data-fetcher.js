const puppeteer = require('puppeteer')
const axios = require('axios');
const cheerio = require('cheerio');

const MovieModel = require('./models/movieModel')

const root_url = "https://www.justwatch.com";
const routes_movies = "/no/provider/netflix/movies";

function extractItems() {
	const titleList = document.querySelectorAll('.title-list-grid__item--link');
  let routes = [];
  for(i=0; i < titleList.length; i++){
    routes.push(titleList[i].getAttribute("href"));
  }

  return routes;
}

async function scrapeRoutes(
  page,
  extractItems,
  itemTargetCount,
  scrollDelay = 1000,
) {
  console.log("Scraping routes");
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitForTimeout(scrollDelay);
    }
  } catch(e) { 
    console.log(e)
  }
  return items;
}

function parseHTMLMovieData(html){
  const $ = cheerio.load(html);
  const name = $('.title-block').find('h1').text();
  const year = $('.text-muted').text().substring(
      $('.text-muted').text().lastIndexOf("(") + 1,
      $('.text-muted').text().lastIndexOf(")"),
  );
  let runtime = "";
  const image = $('.title-poster__image > source').attr("data-srcset").split(', ')[0]
  const synopsis = $('.text-wrap-pre-line > span').text()
  const details = $('.detail-infos__detail--values') //Needs to be more specific
  details.each(function(i, elm){
    //console.log($(this).children().length, " ", $(this).text())
    if($(this).children().length == 0){
      runtime = $(this).text();
      return false
    }
  })
  const movie = new MovieModel({
    name: name,
    year: year,
    runtime: runtime,
    synopsis: synopsis,
    image: image,
    categories: []
  })
  movie.save()
    .then(doc => {
      console.log("Successfully saved: ", name)
    })
    .catch(err => {
      console.log("Error saving", movie)
      console.log(err)
    })
}

async function getMovieData(page, routes){
  for(let i=0; i<routes.length; i++){
    axios(root_url + routes[i])
      .then(res => {
        //console.log("Looking into ", routes[i])
        parseHTMLMovieData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}




(async () => {
  //Connect to mongoose
  const mongoose = require('mongoose')
  
  const dbPath = 'mongodb://localhost/cinemadate';
  const options = {useNewUrlParser: true, useUnifiedTopology: true}
  const mongo = mongoose.connect(dbPath, options);
  
  mongo
  	.then(() => {
  		console.log("Connected to database")
  	})
  	.catch(err => {
  		console.log(err, 'error');
  	})
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 926 });

  // Navigate to the demo page.
  await page.goto(root_url + routes_movies);

  // Scroll and extract items from the page.
  const routes = await scrapeRoutes(page, extractItems, 10);

  // Save extracted items to a file.
	console.log(routes)

  //Get data 
  await getMovieData(page, routes);

  // Close the browser.
  await browser.close();
})();

