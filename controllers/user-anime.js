const axios = require('axios');


const jikanApi = "https://api.jikan.moe/v4/user/"
const animeParam = "/animelist/completed"

// Change all to whatever the user wants. all? completed? watching? Future update?



async function getAnimePerPage(username,pageNo)
{
	try
	{
		let pageCount = pageNo

		const userAnimeUrl = jikanApi + username + animeParam + '/' + pageNo

		const jikanResponse = await axios.get(userAnimeUrl)
		console.log("Data retrived!")
		console.log(jikanResponse.status)

		const currentAnimeLength = Object.keys(jikanResponse.data.anime).length

		console.log("Current anime on page " +pageCount+" is "+currentAnimeLength)


		// Anime Limiter!
		if (pageCount === 4)
		{
			// returns a response status and the data
			return [jikanResponse.status,jikanResponse.data]
		}


		
		// Check if there is 300 anime on the current page
		if (currentAnimeLength === 300) 
		{

			pageCount++

			console.log("More anime is there. Checking next page "+ (pageCount))

			// Get the next page anime
			const getNextAnimeList = await getAnimePerPage(username,pageCount)
			/*console.log("this is what u looking for" + getNextAnimeList[0])*/
			
			// If no anime on next page
			if (getNextAnimeList === undefined) 
			{

				console.log("No anime on next page "+ (pageCount+1))
				console.log("Reseting pageCount")
				pageCount = 1

				return [jikanResponse.status,jikanResponse.data]

				console.log("this should not get printed")

				
			}

			console.log("Adding the new anime to the list and returning it")
			jikanResponse.data.anime = jikanResponse.data.anime.concat(getNextAnimeList[1].anime)


			// returns a response status and the data
			return [jikanResponse.status,jikanResponse.data]
			
			
			
		}

		console.log("Reseting the page count")
		pageCount = 1


		return [jikanResponse.status,jikanResponse.data]
		
	

		
	}
	catch(e)
	{

		console.log(e.message)
		console.log("says user-anime.js")

		// returns the err response status
		throw e
		

	}
}




module.exports = 
{
	getAnimeData: async function getAnimeData(username)
	{

		let pageCount = 1

		console.log("Requesting from "+ jikanApi+username+animeParam)

		try
		{
			const allAnime = await getAnimePerPage(username,pageCount)

			return allAnime
		}
		catch(e)
		{
			throw e
		}
		
	}
}

