//import packages

var nJwt     = require('njwt'); 
var config = require('./config');


exports.verifyJwtHandler= function(event,context,callback){
	var tokentoverify = event.jwt;

		if(!tokentoverify){
			callback(null, JSON.stringify({success:false}));
		}
		else{
			nJwt.verify(tokentoverify,config.secretKey,function(err,token){
				if(err){
						callback(null, JSON.stringify({success:false}));
				}else{
					callback(null, JSON.stringify({success:true}));
					
				}
			});	
		}
     
}

exports.AuthHandler = function(event,context,callback){
	
	
	var tokentoverify = event.authorizationToken;

		if(!tokentoverify){
			 callback(null, JSON.stringify({message:'token is missing.'}));
		}
		else{
				nJwt.verify(tokentoverify,config.secretKey,function(err,token){
				if(err){
					 callback(null, generatePolicy('user', 'Deny',event.methodArn));
				}else{
					  callback(null, generatePolicy('user', 'Allow',event.methodArn));					
				}
			});	
		}
}

// Help function to generate an IAM policy
var generatePolicy = function(principalId, effect, resource) {
    // Required output:
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
   
    return authResponse;
}