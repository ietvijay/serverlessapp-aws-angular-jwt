//import packages

var nJwt     = require('njwt'); 
var config = require('./config');
var AWS = require('aws-sdk');


exports.CreateJwtHandler = function(event,context,callback){
   
    var userName= event.username;
	var pwd= event.password;
	
	//TODO: hash the password.
	var dDBClient = new AWS.DynamoDB.DocumentClient()
	var params = {
		TableName:"dev_moviesdb_users",
		Key:{"email":userName}
	}
	 dDBClient.get(params,function(err,data){
		
		if(err || data.Item.password != pwd){
			  console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));			
			  callback(null, {message:'Invalid user or password.'});
		}else{
			
			 console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
			 // create jwt token.
	
				const payload = {
							    roles: data.Item.roles,
								city:data.Item.city,
								email:data.Item.email
								};
				
				var jwt =  nJwt.create(payload,config.secretKey);
				
				var token= jwt.compact();
				
			 callback(null, {
					success:true,
					tokenType: 'Bearer',
					token: token
				
				});
								
		}
			
	});

}
