require('dotenv').config()
const express = require('express')
const userAnime = require('./controllers/user-anime')



const app = express()


app.set('view engine','ejs')

// Allows express to access the form data
app.use(express.urlencoded({extended: false}))

// Home directory
app.get('/',(req,res)=>
{
	res.render("index",{name: "Alan"})
})

app.get('/shelf', async (req,res)=>
{

	const animeTempData = [
	{
		name: "Accel World",
		image_url:"https://cdn.myanimelist.net/images/anime/8/38155.jpg"
	},
	{
		name: "Fairy Tail",
		image_url: "https://cdn.myanimelist.net/images/anime/5/18179.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/12/85994.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/12/43927.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/6/29891.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/5/80148.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/6/21624.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/12/64039.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/12/85994.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/5/19570.jpg"
	},
	{
		image_url: "https://cdn.myanimelist.net/images/anime/3/82956.jpg"
	}]

	try
	{
		const userAnimeData = await userAnime.getAnimeData(process.env.NAME)
		console.log("Information Recieved!")
		/*console.log(userAnimeData.anime)*/
		console.log("Rendering the page")
		res.render("shelf",{ animeData : userAnimeData.anime})
	}
	catch(e)
	{
		console.log(e.message)
		res.redirect("/")
	}

	
	
})



console.log(`Listening on localhost:${process.env.PORT}`)
app.listen(process.env.PORT)


