require('dotenv').config()
const express = require('express')



const app = express()


app.set('view engine','ejs')

// Allows express to access the form data
app.use(express.urlencoded({extended: false}))

// Home directory
app.get('/',(req,res)=>
{
	res.render("index",{name: "Alan"})
})

app.get('/shelf',(req,res)=>
{

	const animeTempData = [
	{
		name: "Accel World",
		cover:"https://cdn.myanimelist.net/images/anime/8/38155.jpg"
	},
	{
		name: "Fairy Tail",
		cover: "https://cdn.myanimelist.net/images/anime/5/18179.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/12/85994.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/12/43927.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/6/29891.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/5/80148.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/6/21624.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/12/64039.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/12/85994.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/5/19570.jpg"
	},
	{
		cover: "https://cdn.myanimelist.net/images/anime/3/82956.jpg"
	}]

	res.render("shelf",{ animeData : animeTempData})
})



console.log(`Listening on localhost:${process.env.PORT}`)
app.listen(process.env.PORT)


