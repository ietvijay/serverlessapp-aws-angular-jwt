var express= require('express');
var app= express();

var bodyParser = require('body-parser');
var morgan= require('morgan');
var AWS = require('aws-sdk');

var nJwt     = require('njwt'); 
//var config = require('./config'); // get our config file


var port = process.env.PORT || 8080;
//imports lambdas
var movieService = require('./lambdas/movies_index');
var jwtService = require('./lambdas/jwt_index');
var usersService = require('./lambdas/users_index');
//dev_moviesdb_users

AWS.config.loadFromPath('./awsconfig.json');


// check user in db.

//app.set('superSecret',config.secretKey);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

//CREATE TOKEN
apiRoutes.post('/token',function(req,res){
	
	var event={
		'username':req.body.userId,
		'password':req.body.password
	};
	jwtService.CreateJwtHandler(event,null,(d,data)=>{
		if(data.success)
			res.json(data);
	});

		
	});
	

//VERIFY TOKEN
apiRoutes.post('/verify/token',function(req,res){
	
		var tokentoverify = req.headers['x-access-token'];

		if(!tokentoverify){
			res.status(403).send({message:'token not provided.'});
		}
		else{
			nJwt.verify(tokentoverify,app.get('superSecret'),function(err,token){
			if(err){
				res.status(403).send({message:'token is invalid.'});
			}else{
				res.status(200).send({message:'token verified'});
			}
});	
		}
     
	
});

//Create Movies
apiRoutes.post('/movies',function(req,res){
	
	var event={
		       stageVariables:{'env':'dev'},
                body:req.body};
	movieService.CreateMovieHandler(event, null,(da,data)=>{
		if(data.statusCode)
		    res.json(data);
		
	})



});

//get movies
apiRoutes.get('/movies/newrelease',(req,res)=>{
	var event={stageVariables:{'env':'dev'}};
	movieService.NewReleaseHandler(event, null,(da,data)=>{
		if(data.statusCode)
		    res.json(data);
		
	})
	
		
})


//get users
apiRoutes.get('/users',function(req,res){
	 
	var event={"stageVariables":{"env":"dev"},
	"queryStringParameters":{"userid":"vyadav@test.com"}
};
	usersService.GetUserHandler(event,null, (a,data)=>{
		res.json(data);
	});
		
})


app.use('/api', apiRoutes);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);