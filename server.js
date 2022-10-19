require('dotenv').config()
const cors = require('cors')
const bodyParser = require("body-parser")
const authRoute = require('./routes/auth/authRoute')
const app = require("express")()
const db = require('./util/database')
const { initMailer, sendMail } = require('./util/mailer')

// Server Constants
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())



// Routes
app.use('/auth', authRoute)


app.get('/', (req, res) => {
    const mail = "yogesh.21mcan149@jecrcu.edu.in";
    const otp = "12345";

    sendMail(process.env.EMAIL, mail, otp, (info) => {
        res.json({ from: info.envelope.from, to: info.envelope.to, msg: "sent" })
    }, (err) => {
        res.json({ from: info.envelope.from, to: info.envelope.to, msg: "Failed" })
    })

    res.send('done')
})

// Server Instance running and database
db.dbConnect(process.env.DB_URL)
    .then(() => {
        console.log("connected to db")

        initMailer(process.env.EMAIL, process.env.PWORD)

        console.log("Initialized mailer")

        app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
    })
    .catch(e => console.log('error: ', e))
