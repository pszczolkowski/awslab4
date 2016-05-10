var AWS = require("aws-sdk");

AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3();

var task =  function(request, callback){
	
	var params = {
		Bucket: request.query.bucket, 
		Key: request.query.key
	};
	
	s3.getObject(params, function(err, data) {
	  if (err) callback(err); // an error occurred
	  else     callback(null, data);           // successful response
	});
	
	
}

exports.action = task