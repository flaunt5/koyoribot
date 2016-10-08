"use strict";

var Botkit = require('botkit');
var express = require('express');
var app     = express();

const SLACK_TOKEN = process.env.slackkey
const ACCESS_TOKEN = process.env.accesstoken

var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: SLACK_TOKEN,
}).startRTM()

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

controller.hears(['.*'],['direct_message','direct_mention','mention', 'ambient'], function(bot,message) {
    console.log(message.text);
    if (message.type == "message") {
        if (message.user == bot.identity.id) {
            // message from bot can be skipped
        }
        else {
            var requestText = message.text;
            var channel = message.channel;
            if (!(channel in sessionIds)) {
                sessionIds[channel] = uuid.v1();
            }
            var request = apiAiService.textRequest(requestText, { sessionId: sessionIds[channel] });
            request.on('response', function (response) {
                console.log(response);
                if (response.result) {
                    var responseText = response.result.fulfillment.speech;
                    if (responseText) {
                        bot.reply(message, responseText);
                    }
                }
            });
            request.on('error', function (error) {
                console.log(error);
            });
            request.end();
        }
    }
});
