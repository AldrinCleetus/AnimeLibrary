const axios = require('axios');


const jikanApi = "http://api.jikan.moe/v3/user/"


module.exports = 
{
	getUserData: async function getUserData(username)
	{

		try
		{

			const userDataUrl = jikanApi + username

			console.log("Requesting from "+ userDataUrl)

			const jikanUserResponse = await axios.get(userDataUrl)
			console.log("Data retrived!")

			return jikanUserResponse.data
		}
		catch(e)
		{

			console.log(e)
			console.log("says user-info.js")

			// returns the err response status
			return null
			
		}

	}
}