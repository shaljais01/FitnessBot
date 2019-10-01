// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            var weight =parseInt(context.activity.text,10);
            await context.sendActivity('weight'+weight.toString());
            await next();
            await context.sendActivity('Enter your Height');
            var height =parseInt(context.activity.text,10);
            await next();
            await context.sendActivity('height'+ height.toString());
            
            var bmi =height*weight;
            await context.sendActivity('your bmi is');
            await context.sendActivity(bmi.toString());
            //await context.sendActivity(`You said '${ context.activity.text }'`);

            // By calling next() you ensure that the next BotHandler is run.
            
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                    await context.sendActivity('Enter your weight');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
