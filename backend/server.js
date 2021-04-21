require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');

var connection = mysql.createConnection({
  host: process.env.MYSQL_CLOUD_HOST,
  password: process.env.MYSQL_CLOUD_PASS,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_CLOUD_USER,
  database: process.env.MYSQL_DB
});

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

// create the express.js object
const app = express();

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

connection.connect(function(err) {  
  if (err) throw err;
  logger.info("Connected");
});

// middleware to use for all requests
app.use(function(req, res, next) {
	// do logging
	logger.info('Something is happening.');
	next();
});

// GET /

app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});

//Get users
app.get('/users/get', function (req, res) {
	connection.query("SELECT * FROM user", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get company
app.get('/company/get', function (req, res) {
	connection.query("SELECT * FROM company", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get attendees
app.get('/meeting/:meetingID/attendees', function (req, res) {
  var id = req.params.meetingID;
	connection.query("select concat(firstname, ' ', lastname) as attendees from user u inner join meetingInvites mi on u.userID = mi.addresseeID inner join meeting m on mi.meetingID = m.meetingID where m.meetingID = ? and mi.accepted = 1;", id,
  function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST /

// create a company post
app.post('/createpost', async (req, res) => {
  var id = req.body.companyID;
  var title = req.body.title;
  var description = req.body.description;
  
  let array = [id, title, description];
  var sql = "INSERT into `fireworks`.`post` (`companyID`,`title`,`description`) values (?,?,?)";
  connection.query(sql, array, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
  });
});

// create a meeting/event
app.post('/createmeeting', async (req, res) => {
  var description = req.body.description || "";
  var start = req.body.startTime;
  var end = req.body.endTime;
  var link = req.body.meetingLink || "";
  var company = req.body.hostCompanyID;
  var loc = req.body.location || "";
  var meetingType = req.body.meetingType;
  var eventDate = req.body.eventDate;
  
  let array = [description,start,end,link,company,loc,meetingType,eventDate];
  var sql = "INSERT into `fireworks`.`meeting` (`meetingID`,`description`,`startTime`,`endTime`,`meetingLink`,`hostCompanyID`,`location`,`meetingType`,`eventDate`) values (DEFAULT,?,?,?,?,?,?,?,?)";
  connection.query(sql, array, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
  });
});

// DELETE /
app.delete('/meeting/:meetingID', async (req,res) => {
  var id = req.params.meetingID;
  connection.query("DELETE FROM meeting WHERE meetingID = ?", meetingID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
  });
});

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
