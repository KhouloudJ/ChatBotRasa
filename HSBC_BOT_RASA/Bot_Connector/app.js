// This loads the environment variables from the .env file
require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');
var Request = require("request");



// Setup Restify Server
var inMemoryStorage = new builder.MemoryBotStorage();
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


// Create connector and listen for messages
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen())

var bot = new builder.UniversalBot(connector, function (session) {

   // rasaCoreApiBaseURL = "http://127.0.0.1:5000/" + session.message.text;


        session.send(session.message.text)
   /*session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text); */

})
.set('storage', inMemoryStorage);



