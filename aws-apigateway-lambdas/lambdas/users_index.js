//import packages
"use strict";
var AWS = require('aws-sdk');

//using proxy integration
exports.GetUserHandler = function(event,context,callback){
	   
	   var _env= event.stageVariables.env
		  
   

   
   var username = event.queryStringParameters.userid;
   var tableName= _env +"_moviesdb_users";
   var dDBClient = new AWS.DynamoDB.DocumentClient()
  
		
   var params = {
				TableName:tableName,
			    Key:{"email":username}
			   }
		console.log(JSON.stringify(params));	   
			   
			   dDBClient.get(params,function(err,data){
							var body={};
						
							var statusCode=200;
							
							if(!err){
							 body=JSON.stringify({roles:data.Item.roles});
							}
								else{
									   statusCode =400;
										  body=JSON.stringify(err);
								}
								
					const res = {
					"statusCode": statusCode,
					"headers": {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'Get,Post'},
					"body": body   // body must be returned as a string
				};
			    callback(null,res);
	
			})		
								
}

