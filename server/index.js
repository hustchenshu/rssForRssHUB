const express = require('express')
const app = express()
const path = require("path")
var router = express.Router()

// const Api = require("./api")
var axios = require("axios")
var xml2js = require("xml2js")

const axios_ins = axios.create({
    responseType: 'json',
    headers: { 'X-Juejin-Src': 'web' },
});
app.use('/public', express.static(path.join(__dirname, '../public')))

app.get('/', function(req, res) {
    console.log(req.params)

    require("../client/test/route").route(req, res);

})
app.listen(3000, () => console.log('Example app listening on port 3000!'))