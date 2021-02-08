require('dotenv').config()
const express = require('express')
const userAnime = require('./controllers/user-anime')
const screenshotLib = require('./controllers/library-screenshot')
const path = require('path')



const app = express()


app.set('view engine','ejs')

// Allows express to access the form data
app.use(express.urlencoded({extended: false}))

// Home directory
app.get('/',(req,res)=>
{
	res.render("index")
})

/*app.post('/shelf', async (req,res)=>
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

*/

app.post('/shelf',async (req,res)=>
{
	const userName = (req.body.userName).replace(/\s/g, '').toLowerCase();

	if (req.body.mainButton === "view") 
	{
		res.redirect(`shelf/${userName}`)
	}
	else
	{	
		// redirect into get so something heppens!

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
		/*res.sendFile(path.join(__dirname,"/screenshot.png"))*/

		res.send(scr)

	}
	catch(e)
	{
		console.log(e.message)

		res.redirect('/')
	}
		
})


app.get('/shelf/:userid', async (req,res)=>
{
	const userName = req.params.userid

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



/*app.get('/screenshot', async (req,res)=>
{

	const scr = await screenshotLib.getScreenshot(req,res,'https://localhost:4242/shelf')

	res.redirect("/")
})*/



console.log(`Listening on localhost:${process.env.PORT}`)
app.listen(process.env.PORT)


