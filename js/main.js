"use strict";

var Botkit = require('botkit');

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
