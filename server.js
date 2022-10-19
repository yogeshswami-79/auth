require('dotenv').config()
const cors = require('cors')
const bodyParser = require("body-parser")
const authRoute = require('./routes/auth/authRoute')
const app = require("express")()
const db = require('./util/database')

// Server Constants
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())



// Routes
app.use('/auth', authRoute)


// Server Instance running and database
db.dbConnect(process.env.DB_URL)
.then(()=>{
    console.log("connected to db")

    app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`))
})
.catch(e=>console.log('error: ', e))



