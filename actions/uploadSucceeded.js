var AWS = require("aws-sdk"),
	helpers = require("../helpers");

var APP_CONFIG_FILE = "./app.json";

AWS.config.loadFromPath('./config.json');
var appConfig = helpers.readJSONFile(APP_CONFIG_FILE);

var simpledb = new AWS.SimpleDB();
var sqs = new AWS.SQS();

createDomain();

exports.action = task;


function task(request, callback){
	var messageBody = {
		Bucket: request.query.bucket, 
		Key: request.query.key
	};
	
	var params = {
		MessageBody: JSON.stringify(messageBody),
		QueueUrl: appConfig.QueueUrl
	};
	
	sqs.sendMessage(params, function(err, data) {
		if (err) {
			console.log(err, err.stack);
		} else {
			callback(null, 'File has been successfully uploaded');
		}
	});
}

function createDomain() {
	var params = {
		DomainName: 'pszczolkowski-file-digests'
	};

	simpledb.createDomain(params, function(err, data) {
		if (err) {
			console.log(err, err.stack);
		} else {
			
		}
	});
}