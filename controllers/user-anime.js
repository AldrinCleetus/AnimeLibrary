const axios = require('axios');


const jikanApi = "http://api.jikan.moe/v3/user/"
const animeParam = "/animelist/all"

module.exports = 
{
	getAnimeData: async function getAnimeData(username)
	{
		console.log("Requesting from "+ jikanApi+username+animeParam)

		try
		{
			const jikanResponse = await axios.get(jikanApi+username+animeParam)
			console.log("Data retrived!")
			//console.log(jikanResponse.data)
			return jikanResponse.data
		}
		catch(e)
		{
			console.log(e.message)
			return (e.message)
		}
	}
}

