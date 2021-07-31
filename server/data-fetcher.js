const axios = require('axios');

const MovieModel = require('./models/movieModel')

require('dotenv').config()

const accessToken = process.env.API_TOKEN
const API_URL = process.env.API_URL
const API_IMAGE_URL = process.env.API_IMAGE_URL
const DATABASE_URL = process.env.DATABASE_URL


const getDataFromAPI = async() => {
  var movieResponses = []
  for(var i=1; i<10; i++){
    const res = await axios.get(`${API_URL}popular?page=` + i, {
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
    const res = await axios.get(`${API_URL}${filtered[i].id}/watch/providers`, {
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
      const image = `${API_IMAGE_URL}${movie.poster_path}`
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
  
  const dbPath = DATABASE_URL 
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

  console.log("Filtered data: ", filteredMovieData.length)

  console.log("SAVING --------------------------------------------------------------------------------------")
  await saveDataToDatabase(filteredMovieData)

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

