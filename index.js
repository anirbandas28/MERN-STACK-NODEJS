var http = require('http');
var dotenv = require('dotenv');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

dotenv.config();
const arr = [];
let app = express();

require('./config/database')();
let router = require('./routes/api-route');

app.use(express.static(path.join(__dirname, "public")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api', router.route);


const server = http.createServer(app);
server.listen(process.env.PORT, function(err) {
  if(err) throw err;
  console.log(`Server is runing on port: ${process.env.PORT}`)
});