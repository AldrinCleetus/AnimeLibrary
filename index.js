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



console.log(`Listening on localhost:${process.env.PORT}`)
app.listen(process.env.PORT)


