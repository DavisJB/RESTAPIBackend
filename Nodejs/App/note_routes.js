
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	
	// Using CORS to allow cross origin requests
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	
	//Retrieving all records in MongoDB
	app.get('/notes', (req, res) => {
    db.collection('notes').find({}).toArray(function(err, item) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
	
	//Creating a new record in MongoDB
	app.post('/notes', (req, res) => {   
	const note = { text: req.body.value };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  
  //Deleting a record in MongoDB 
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { 'text': id };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });
  
  //Updating a record in MongoDB
  app.put('/notes/:texts', (req, res) => {
    const texts = req.params.texts;
    const details = { 'text': texts };
    const note = { text: req.body.value };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};