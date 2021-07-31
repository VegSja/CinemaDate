const axios = require('axios');

const MovieModel = require('./models/movieModel')

require('dotenv').config()

const accessToken = process.env.API_TOKEN

//function extractItems() {
//	const titleList = document.querySelectorAll('.title-list-grid__item--link');
//  let routes = [];
//  for(i=0; i < titleList.length; i++){
//    routes.push(titleList[i].getAttribute("href"));
//  }
//
//  return routes;
//}
//
//async function scrapeRoutes(
//  page,
//  extractItems,
//  itemTargetCount,
//  scrollDelay = 1000,
//) {
//  console.log("Scraping routes");
//  let items = [];
//  try {
//    let previousHeight;
//    while (items.length < itemTargetCount) {
//      items = await page.evaluate(extractItems);
//      previousHeight = await page.evaluate('document.body.scrollHeight');
//      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
//      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
//      await page.waitForTimeout(scrollDelay);
//    }
//  } catch(e) { 
//    console.log(e)
//  }
//  return items;
//}
//async function parseHTMLMovieData(html){
//  const $ = cheerio.load(html);
//    const name = $('.title-block').find('h1').text();
//    const year = $('.text-muted').text().substring(
//        $('.text-muted').text().lastIndexOf("(") + 1,
//        $('.text-muted').text().lastIndexOf(")"),
//    );
//    let runtime = "";
//    const image = $('.title-poster__image > source').attr("data-srcset").split(', ')[0]
//    const synopsis = $('.text-wrap-pre-line > span').text()
//    const details = $('.detail-infos__detail--values') //Needs to be more specific
//    details.each(function(i, elm){
//      //console.log($(this).children().length, " ", $(this).text())
//      if($(this).children().length == 0){
//        runtime = $(this).text();
//        return false
//      }
//    })
//    const movie = new MovieModel({
//      name: name,
//      year: year,
//      runtime: runtime,
//      synopsis: synopsis,
//      image: image,
//      categories: []
//    })
//    movie.save()
//      .then(doc => {
//        console.log("Successfully saved: ", name)
//      })
//      .catch(err => {
//        console.log("Error saving", movie)
//        console.log(err)
//      })
//}

//async function getMovieData(page, routes){
//  for(let i=0; i<routes.length; i++){
//    axios(root_url + routes[i])
//      .then(async(res) => {
//        await sleep(2000)
//        await parseHTMLMovieData(res.data)
//      })
//      .catch(err => {
//        console.log(err)
//      })
//  }
//}

const getDataFromAPI = async() => {
  var movieResponses = []
  for(var i=1; i<10; i++){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=` + i, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    })
    movieResponses = movieResponses.concat(res.data.results)
  }
  return movieResponses
}

const filterDataFromList = async(unfiltered) => {
  const filtered = unfiltered
  for(var i = filtered.length-1; i>0; i--){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${filtered[i].id}/watch/providers`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    })
    try{
      const no_providers = res.data.results["NO"]["flatrate"].map(prov => prov.provider_name)
      if(!no_providers.includes('Netflix')){
        console.log("Removing", filtered[i].title, "With providers: ", no_providers)
        filtered.splice(i, 1) 
      }
    } catch(e){
      console.log("Could not find data for. Removing", filtered[i].title)
      filtered.splice(i, 1) 
    }
  }
  return filtered
}

const saveDataToDatabase = async(filteredMovieList) => {
  for(let i=0; i<filteredMovieList.length; i++){
    const movie = filteredMovieList[i]
    const name = movie.title
    try{
      const synopsis = movie.overview
      const image = "https://image.tmdb.org/t/p/w500" + movie.poster_path
      const year = movie.release_date.split('-')[0]
      const movieEntry = new MovieModel({
        name: name,
        year: year,
        runtime: "1h 15min",
        synopsis: synopsis,
        image: image,
        categories: []
      })
      movieEntry.save()
        .then(doc => {
          console.log("[",i,"]","Successfully saved: ", name)
        })
        .catch(err => {
          console.log(err.message)
        })
      }
    catch(e){
      console.log("Could not save: ", name)
    }
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
  
  const movieData = await getDataFromAPI()
  console.log("Number of movies gotten: ", movieData.length)
  const filteredMovieData =  await filterDataFromList(movieData)

  console.log(filteredMovieData)
  console.log("Filtered data: ", filteredMovieData.length)

  //await saveDataToDatabase(movieData)

  //// Set up browser and page.
  //const browser = await puppeteer.launch({
  //  headless: true,
  //  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  //});
  //const page = await browser.newPage();
  //page.setViewport({ width: 1280, height: 926 });

  //// Navigate to the demo page.
  //await page.goto(root_url + routes_movies);

  //// Scroll and extract items from the page.
  //const routes = await scrapeRoutes(page, extractItems, 10);

  //// Save extracted items to a file.
	//console.log(routes)

  ////Get data 
  //await getMovieData(page, routes);

  //// Close the browser.
  //await browser.close();
})();

