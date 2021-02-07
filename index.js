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

app.post('/shelf', async (req,res)=>
{

	const userName = (req.body.userName).replace(/\s/g, '').toLowerCase();

	try
	{
		const userAnimeData = await userAnime.getAnimeData(userName)
		console.log("Information Recieved!")
		
		if (userAnimeData[0] === 200) 
		{
			console.log("Rendering the page")
			res.render("shelf",{ 
				animeData : userAnimeData[1].anime,
				userInfo: userName
			})
		}
		else
		{
			console.log("Sorry something happened!")
			res.redirect('/')
		}

	}
	catch(e)
	{
		console.log(e.message)
		res.redirect("/")
	}

	
	
})



console.log(`Listening on localhost:${process.env.PORT}`)
app.listen(process.env.PORT)


