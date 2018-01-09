const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const cors 			 = require('cors')
const app            = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

//Allowing cross origin requests
app.use(cors())

//Using MongoClient to connect to the database.
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./App')(app, database);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})

