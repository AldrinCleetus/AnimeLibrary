const axios = require('axios');


const jikanApi = "http://api.jikan.moe/v3/user/"
const animeParam = "/animelist/all"

// change all to whatever the user wants. all? completed? watching?

let pageCount = 1

// Temporary Cache
let cache = []





async function getAnimePerPage(username,pageNo)
{
	try
	{

		const userAnimeUrl = jikanApi + username + animeParam + '/' + pageNo

		const jikanResponse = await axios.get(userAnimeUrl)
		console.log("Data retrived!")
		console.log(jikanResponse.status)

		const currentAnimeLength = Object.keys(jikanResponse.data.anime).length

		console.log("Current anime on page " +pageCount+" is "+currentAnimeLength)


		
		// Check if there is more than 300 anime on the current page
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

			

			/*console.log(cache)*/

			// returns a response status and the data
			return [jikanResponse.status,jikanResponse.data]
			
			
			
		}

		console.log("Reseting the page count")
		pageCount = 1

		cache.push({
				user: username,
				data: jikanResponse
		})

		return [jikanResponse.status,jikanResponse.data]
		
	

		
	}
	catch(e)
	{
		console.log(e)

		// returns the err response status
		return [404,null]
		

	}
}




module.exports = 
{
	getAnimeData: async function getAnimeData(username)
	{


		console.log("Requesting from "+ jikanApi+username+animeParam)

		console.log(cache)


		let found = 
		{
			status: false,
			dataID: 0
		}

		// Check if the data is already cached
		cache.every( (cachedData,index) =>
		{
			if (cachedData.user === username.toString()) 
			{
				console.log("Data cached! Sending cached data!")

				found.status = true
				found.dataID = index

				console.log(found)

				return false
			}
		})

		if (found.status)
		{
			const cachedDataFound = cache[found.dataID].data

			return [cachedDataFound.status,cachedDataFound.data]
		}
		else 
		{

			
			return getAnimePerPage(username,pageCount)

			/*try
			{

				const jikanResponse = await axios.get(jikanApi+username+animeParam)
				console.log("Data retrived!")
				console.log(jikanResponse.status)

				console.log(Object.keys(jikanResponse.data.anime).length)

				cache.push({
					user: username,
					data: jikanResponse
				})

				console.log(cache)

				// returns a response status and the data
				return [jikanResponse.status,jikanResponse.data]
			}
			catch(e)
			{
				console.log(e.message + " Hmmmm")

				// returns the err response status
				return [e.response.status,null]
				

			}*/
		}
	}
}

