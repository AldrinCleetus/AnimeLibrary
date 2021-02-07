const axios = require('axios');


const jikanApi = "http://api.jikan.moe/v3/user/"
const animeParam = "/animelist/all"

let simpledb = []

module.exports = 
{
	getAnimeData: async function getAnimeData(username)
	{
		console.log("Requesting from "+ jikanApi+username+animeParam)

		console.log(simpledb)

		let found = 
		{
			status: false,
			dataID: 0
		}

		// Check if the data is already cached
		simpledb.every( (cachedData,index) =>
		{
			if (cachedData.user === username) 
			{
				console.log("Data cached! Sending cached data!")
				found.status = true
				found.dataID = index
				return false
			}
		})

		if (found.status)
		{
			const cachedDataFound = simpledb[found.dataID].data

			return [cachedDataFound.status,cachedDataFound.data]
		}
		else 
		{
			try
			{

				const jikanResponse = await axios.get(jikanApi+username+animeParam)
				console.log("Data retrived!")
				console.log(jikanResponse.status)

				simpledb.push({
					user: username,
					data: jikanResponse
				})

				console.log(simpledb)

				// returns a response status and the data
				return [jikanResponse.status,jikanResponse.data]
			}
			catch(e)
			{
				console.log(e.message)

				// returns the err response status
				return [e.response.status,null]
				

			}
		}
	}
}

