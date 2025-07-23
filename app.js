const {exec} = require("child_process")
const express = require("express")
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const routes = require("./routes")
app.use(express.json())
app.use('/api', routes);
app.listen(3000, () => {
    console.log("Server is up and running on " + 3000)

})

