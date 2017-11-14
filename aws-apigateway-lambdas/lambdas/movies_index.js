//import packages
"use strict";
var AWS = require('aws-sdk');

//using proxy integration
exports.CreateMovieHandler = function(event,context,callback){
	
	
	   var requestdata = {};
	   var _env= event.stageVariables.env
		   if(event.movie !=null && event.env!=null){
			   requestdata = event;
		   }
		   else if(event.body !=null){
			  var body = JSON.parse(event.body)
			   requestdata = body;
		   }
   

   
   var movieItem = requestdata.movie;
   var tableName= _env +"_moviesdb_movies";
   var dDBClient = new AWS.DynamoDB.DocumentClient()
   
   
   var params = {
				TableName:tableName,
				Item:movieItem
			   }
	dDBClient.put(params,function(err,data){
		
		var response={};
		var body={};
		var statusCode=200;
		if (err) {
			   statusCode =400;
			        body=JSON.stringify(err);
		    	     response ={success:false,reason:JSON.stringify(err)};
                     console.error("Unable to add item. Error JSON:", JSON.stringify(err));
		
		} else {
			  body=JSON.stringify(data);
					response ={success:true,reason:JSON.stringify(data)};
					console.log("Added item:", JSON.stringify(data));
		}
	const res = {
        "statusCode": statusCode,
        "headers": {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'Get,Post'},
        "body": body   // body must be returned as a string
    };
	  callback(null,res);
	 // context.succeed(res);	
	})
	
}

//To be used in Lambda proxy integration.
exports.NewReleaseHandler = (event,context,callback)=>{
	    
	    var _env= event.stageVariables.env
	    var currentYear= (new Date()).getFullYear();
		var tableName= _env +"_moviesdb_movies";
		var dDBClient = new AWS.DynamoDB.DocumentClient();
		
		var queryParams = {
			TableName:tableName,
			KeyConditionExpression: "#yr = :yyyy",
			ExpressionAttributeNames:{
				"#yr": "year"
			},
			ExpressionAttributeValues: {
				":yyyy":currentYear
			}
		};
		
		var body={};
		var statusCode=200;
		 dDBClient.query(queryParams,(error,data)=>{
			 if(error){
				  statusCode =400;
				 body= JSON.stringify(error);
				 console.log("error occurred",JSON.stringify(error));
				 
			 }else{
				 body = JSON.stringify(data.Items);
				 console.log("Success");
			 }
			 const res = {
        "statusCode": statusCode,
        "headers": {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'Get,Post'},
        "body": body };
		
	    callback(null,res);
			 
		 });
		
		
	
};