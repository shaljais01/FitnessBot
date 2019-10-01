// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
var height=0;
var weight=0;
var step=0;
var bmi;
class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            if(step==0){
             weight =parseInt(context.activity.text,10);
             await context.sendActivity(' weight is '+ weight.toString());
             step++;
             await context.sendActivity('Enter your height in m');
            }
            else if(step==1){
                height =parseInt(context.activity.text,10);
                await context.sendActivity(' height is '+ height.toString());
                 bmi =weight/height;
                await context.sendActivity('your bmi is');
                await context.sendActivity(bmi.toString());
                if(bmi<18.5){
                    await context.sendActivity('You Are in the underweight range');
                }
                else if(bmi>=18.5 && bmi<=24.9){
                    await context.sendActivity('You Are in the healthy range');
                }
                else if(bmi>25 && bmi <=29.9){
                    await context.sendActivity('You Are in the overweight range');
                }
                else{
                    await context.sendActivity('You Are in the obese range');
                }
                step++;

                await context.sendActivity('Do you want to see diet plan\n Enter Yes or No');
            }
            else if(step==2){
                var answer= context.activity.text;
                if(answer=="Yes"){
                    if(bmi<18.5){
                        await context.sendActivity('Breakfast : 2 egg brown bread sandwich + green chutney + 1 cup milk + 3 cashews + 4 almonds + 2 walnuts');
                        await context.sendActivity('Mid meal : 1 cup banana shake');
                        await context.sendActivity('Lunch : 1 cup arhar dal + 1 cup potato curry + 3 chapatti + 1/2 cup rice + 1/2 cup low fat curd + salad');
                        await context.sendActivity('Evening : 1 cup strawberry smoothie + 1 cup vegetable poha');
                        await context.sendActivity('Dinner : 1.5 cup chicken curry + 3 chapatti + salad');
                    }
                    else if(bmi>=18.5 && bmi<=24.9){
                        await context.sendActivity('Breakfast : 2 egg brown bread sandwich + green chutney + 1 cup milk + 3 cashews + 4 almonds + 2 walnuts');
                        await context.sendActivity('Mid meal : 1 cup banana shake');
                        await context.sendActivity('Lunch : 1 cup arhar dal + 1 cup potato curry + 3 chapatti + 1/2 cup rice + 1/2 cup low fat curd + salad');
                        await context.sendActivity('Evening : 1 cup strawberry smoothie + 1 cup vegetable poha');
                        await context.sendActivity('Dinner : 1.5 cup chicken curry + 3 chapatti + salad');
                    }
                    else if(bmi>25 && bmi <=29.9){
                        await context.sendActivity('Breakfast : 2 egg brown bread sandwich + green chutney + 1 cup milk + 3 cashews + 4 almonds + 2 walnuts');
                        await context.sendActivity('Mid meal : 1 cup banana shake');
                        await context.sendActivity('Lunch : 1 cup arhar dal + 1 cup potato curry + 3 chapatti + 1/2 cup rice + 1/2 cup low fat curd + salad');
                        await context.sendActivity('Evening : 1 cup strawberry smoothie + 1 cup vegetable poha');
                        await context.sendActivity('Dinner : 1.5 cup chicken curry + 3 chapatti + salad');
                    }
                    else{
                        await context.sendActivity('Breakfast : 2 egg brown bread sandwich + green chutney + 1 cup milk + 3 cashews + 4 almonds + 2 walnuts');
                        await context.sendActivity('Mid meal : 1 cup banana shake');
                        await context.sendActivity('Lunch : 1 cup arhar dal + 1 cup potato curry + 3 chapatti + 1/2 cup rice + 1/2 cup low fat curd + salad');
                        await context.sendActivity('Evening : 1 cup strawberry smoothie + 1 cup vegetable poha');
                        await context.sendActivity('Dinner : 1.5 cup chicken curry + 3 chapatti + salad');
                    }
                }

            }
            await next();
            //await context.sendActivity(`You said '${ context.activity.text }'`);

            // By calling next() you ensure that the next BotHandler is run.
            
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                    await context.sendActivity('Enter your weight in kg');
                    
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
