const express = require('express')
const userAnime = require('./controllers/user-anime')
const userProfile = require('./controllers/user-info')
const screenshotLib = require('./controllers/library-screenshot')
const path = require('path')


const app = express()


app.set('view engine','ejs')

app.use(express.static(__dirname + '/public'))

// Allows express to access the form data
app.use(express.urlencoded({extended: false}))



// Home directory
app.get('/',(req,res)=>
{
	res.render("index")
})


app.post('/shelf',async (req,res)=>
{
	const userName = (req.body.userName).replace(/[^\w-]+/g, '').toLowerCase();


	if (req.body.mainButton === "view") 
	{
		res.redirect(`shelf/${userName}`)
	}
	else
	{	
		// It must be screenshot button so: 
		res.redirect(`/screenshot/${userName}`)
		
	}

	
})

app.get('/screenshot/:username', async (req,res)=>
{
	console.log("Hello there!")

	const userName = req.params.username

	try
	{	
		console.log("getting the screenshot")
		const scr = await screenshotLib.getScreenshot(userName)
		console.log("sending the pic")
		res.set({
			'content-type':'image/png'
		})
		

		res.send(scr)

	}
	catch(e)
	{
		console.log(e.message)
		console.log("says index.js")

		res.redirect('/')
	}
		
})


app.get('/shelf/:userid', async (req,res)=>
{
	const userName = req.params.userid.replace(/[^\w-]+/g, '').toLowerCase();

	try
	{
		console.log(" ")

		console.log("Waiting for Anime Data")
		const userAnimeData = await userAnime.getAnimeData(userName)
		console.log("AnimeData Recieved!")

		console.log(" ")

		console.log("Waiting for User Data")
		const userData = await userProfile.getUserData(userName)
		console.log("UserData Recieved!")

		
		if (userAnimeData[0] === 200) 
		{
			console.log("Anime recieved here: " + Object.keys(userAnimeData[1].anime).length)

			console.log("Rendering the page")
			res.render("shelf",{ 
				animeData : userAnimeData[1].anime,
				userInfo: userData
			})
		}
		else
		{
			console.log("index: Sorry I didn't recieve any Anime")
			res.redirect('/')
		}

	}
	catch(e)
	{

	
		if (e.response.status === 404 || e.response.status === 400) 
		{
			res.render("error")
		}
		else
		{
			res.redirect("/")
		}

		console.log(e.message)
		console.log("says index.js")
		
	}
	
})



console.log(`Listening on localhost: 4242`)
app.listen(process.env.PORT || 4242)


