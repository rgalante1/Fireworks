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
app.use(bodyParser.urlencoded());
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));

connection.connect(function (err) {
	if (err) throw err;
	logger.info("Connected");
});

// middleware to use for all requests
app.use(function (req, res, next) {
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

//Get users by ID
app.get('/users/:id', function (req, res) {

  var query = "SELECT * FROM user where userID =\""+req.params.id+"\"";

	connection.query(query, function (err, result, fields) {

		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get all posts
app.get('/post', function (req, res) {
	connection.query("SELECT * FROM post", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});



//Get company
app.get('/company', function (req, res) {
	connection.query("SELECT * FROM company", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get company by ID
app.get('/company/:id', function (req, res) {

  var query = "SELECT * FROM company where companyID =\""+req.params.id+"\"";

	connection.query(query, function (err, result, fields) {

		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get rating
app.get('/rating', function (req, res) {
	connection.query("SELECT * FROM rating", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get rating by ID
app.get('/rating/:id', function (req, res) {

  var query = "SELECT * FROM rating where ratingID =\""+req.params.id+"\"";

	connection.query(query, function (err, result, fields) {

		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get friendship
app.get('/friendship', function (req, res) {
	connection.query("SELECT * FROM friendship", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get friendship by ID
app.get('/friendship/:id', function (req, res) {

  var query = "SELECT * FROM friendship where friendshipID =\""+req.params.id+"\"";

	connection.query(query, function (err, result, fields) {

		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get meetingInvites
app.get('/meetingInvites', function (req, res) {
	connection.query("SELECT * FROM friendship", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get meetingInvites by ID
app.get('/meetingInvites/:id', function (req, res) {

  var query = "SELECT * FROM meetingInvites where inviteID =\""+req.params.id+"\"";

	connection.query(query, function (err, result, fields) {

		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get friendInvites
app.get('/friendInvites', function (req, res) {
	connection.query("SELECT * FROM friendInvites", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//Get friendInvites by ID
app.get('/friendInvites/:id', function (req, res) {

  var query = "SELECT * FROM friendInvites where inviteID =\""+req.params.id+"\"";

	connection.query(query, function (err, result, fields) {

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

app.post('/login', (req, res) => {

	if (!(req.body.username && req.body.password)) {

		res.status(400).send("Missing email or password");
		return;
	}

	var query = "select * from user where username=\"" + req.body.username + "\" and p" +
		"assword=\"" + req.body.password + "\";";

	connection.query(query, function (err, result, fields) {
		if (err) {
			res.status(500).send("Failed SQL Query");
			return;
		}

		switch (result.length) {
			case 0:
				res.status(200).send(false);
				break;
			case 1:
				res.status(200).send(true);
				break;
			default:
				res.status(402).send("Too Many Users Found");
				return;
		}

	})
})

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

	let array = [description, start, end, link, company, loc, meetingType, eventDate];
	var sql = "INSERT into `fireworks`.`meeting` (`meetingID`,`description`,`startTime`,`endTime`,`meetingLink`,`hostCompanyID`,`location`,`meetingType`,`eventDate`) values (DEFAULT,?,?,?,?,?,?,?,?)";
	connection.query(sql, array, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
});

// DELETE /
app.delete('/meeting/:meetingID', async (req, res) => {
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

app.post('/createaccount', function (req, res) {
	var FirstName = req.param('First Name');
	var LastName = req.param('Last Name');
	var UserName = req.param('User Name');
	var PassWord = req.param('Password');
	var BirthDate = req.param('Birthday');
	var CompanyAccount = req.param('Company Account');
	var CompanyName = req.param('Company Name');
	var Description = req.param('Description');

	/*
	connection.query("SELECT * FROM user WHERE username = ? ", UserName, function (err, result, fields) {
		if(result.length > 0){
			return res.status(401).json({ UserExists: "User already exists" });
			
			con.release()
			if(err) throw err;
		}
		
	});
	*/

	if (CompanyAccount) {
		connection.query("INSERT INTO user (firstName,lastName,username,password) VALUES (?,?,?,?)", [FirstName, LastName, UserName, PassWord], function (err, result, fields) {
			if (err) throw err;
			res.end(JSON.stringify(result)); // Result in JSON format
		});

		connection.query("INSERT INTO company (companyName,description) VALUES (?,?)", [CompanyName, Description], function (err, result, fields) {
			if (err) throw err;
			res.end(JSON.stringify(result)); // Result in JSON format
		});
	}
	else {
		connection.query("INSERT INTO user (firstName,lastName,username,password) VALUES (?,?,?,?)", [FirstName, LastName, UserName, PassWord], function (err, result, fields) {
			if (err) throw err;
			res.end(JSON.stringify(result)); // Result in JSON format
		});
	}


});

app.get('/post/:companyID', function (req, res) {
	var CompanyID = req.param('companyID');

	connection.query("SELECT * FROM post WHERE companyID = ?", CompanyID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

app.get('/profile/:username', function (req, res) {
	var UserName = req.param('username');
	//console.log("First log inside username");
	//console.log(UserName); 
	
	connection.query("SELECT * FROM user WHERE username = ?", UserName, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});

});


app.get('/profile/:username/friendrequests', function (req, res) {
	var UserName = req.body.request;
	//console.log("First log");
	//console.log(UserName);
	
	var query = "SELECT * FROM user u INNER JOIN friendInvites fi on u.userID = fi.addresseeID WHERE username ='" + UserName + "' AND accepted = 0"
	
	//console.log("Second log");
	//console.log(query);
	
	connection.query("SELECT * FROM user u INNER JOIN friendInvites fi on u.userID = fi.addresseeID WHERE username = ? AND accepted = 0", UserName, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

app.get('/profile/:username/requestcheck', function (req, res)  {
	var useraddressee = req.body.useraddressee;
	console.log("Inside requestcheck");
	console.log(useraddressee);
	var usersender = req.body.usersender;
	console.log(usersender);
	
	connection.query("SELECT * FROM user u1 INNER JOIN friendInvites fi on (u1.userID  = fi.addresseeID) OR (u1.userID = fi.senderID) INNER JOIN  user u2 on (u2.userID = fi.senderID) OR (u2.userID = fi.addresseeID)where u1.username = ? AND u2.username = ? ", [useraddressee, usersender] , function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
	
});

app.put('/profile/:username/togglerequest', function(req, res) {
	var InviteID = req.body.inviteID
	
	connection.query("UPDATE friendInvites SET accepted = 1 WHERE inviteID = ?", InviteID , function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

app.post('/profile/:username/friendship', async (req, res) => {
	var useraddressee = req.body.useraddressee;
	var usersender = req.body.usersender
	

	let array = [useraddressee, usersender];
	
	connection.query("INSERT INTO friendship (`user1ID`, `user2ID`, `dateFriended`) SELECT u1.userID, u2.userID, CURDATE() FROM user u1 CROSS JOIN user u2 WHERE u1.username = ? AND u2.username = ?", array, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
	
});

app.put('/profile/:username/changeinfo', function(req, res) {
	var UserName = req.body.username;
	
	var FirstName = req.body.firstName;
	var LastName = req.body.lastName;
	var AboutME = req.body.aboutMe;
	var jobTitle = req.body.jobTitle;
	var Location = req.body.location;
	var PhoneNumber = req.body.phoneNumber;
	var EmailAddress = req.body.emailAddress;
	var ProfilePhotoURL = req.body.profilePhotoURL;
	
	let array = [UserName, FirstName, LastName,AboutME,jobTitle,Location,PhoneNumber,EmailAddress,ProfilePhotoURL ];
	connection.query("UPDATE user SET FirstName = ?, LastName = ?, AboutME = ?, jobTitle = ?, Location = ?, PhoneNumber = ?, EmailAddress = ?, ProfilePhotoURL = ? WHERE username = ?", array , function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

