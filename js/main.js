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
