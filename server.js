require('dotenv').config()
const cors = require('cors')
const bodyParser = require("body-parser")
const authRoute = require('./routes/auth/authRoute')
const app = require("express")()


// Server Constants
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())



// Routes
app.use('/auth', authRoute)



// Server Instance running
app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`))



