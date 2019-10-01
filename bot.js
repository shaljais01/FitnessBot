// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const https = require('https');
const { ActivityHandler } = require('botbuilder');
var height=0;
var weight=0;
var step=0;
var bmi;
var unit;

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            if(step==0){
             weight =parseFloat(context.activity.text,10);
             await context.sendActivity(' weight is '+ weight.toString());
             step++;
             await context.sendActivity('Enter your height');
             await context.sendActivity('Want to enter in meter , centimeter, foot');
            }
            else if(step==1){
                 unit = context.activity.text;
                if(unit == "meter"){
                    await context.sendActivity('Enter your height in m');
                }
                else if (unit == "centimeter"){
                    await context.sendActivity('Enter your height in cm');
                }
                else if (unit== "foot"){
                    await context.sendActivity('Enter your height in foot');
                }
                step++;

            }
            else if(step==2){
                height =parseFloat(context.activity.text,10);
                if(unit =="centimeter"){
                    height=height/100;
                }
                else if(unit == "foot"){
                    height=height*(0.305);
                }
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
            else if(step==3){
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
                        await context.sendActivity('You can check out the following videos');
                        await context.sendActivity('https://www.youtube.com/watch?v=t7RhG0CEbVw&feature=youtu.be');
                        await context.sendActivity('https://www.youtube.com/watch?v=Gmh_xMMJ2Pw&feature=youtu.be');
                        await context.sendActivity('https://www.youtube.com/watch?v=fuEuNNdi55Q&feature=youtu.be');
                    }
                    else{
                        await context.sendActivity('Breakfast : 2 egg brown bread sandwich + green chutney + 1 cup milk + 3 cashews + 4 almonds + 2 walnuts');
                        await context.sendActivity('Mid meal : 1 cup banana shake');
                        await context.sendActivity('Lunch : 1 cup arhar dal + 1 cup potato curry + 3 chapatti + 1/2 cup rice + 1/2 cup low fat curd + salad');
                        await context.sendActivity('Evening : 1 cup strawberry smoothie + 1 cup vegetable poha');
                        await context.sendActivity('Dinner : 1.5 cup chicken curry + 3 chapatti + salad');
                        await context.sendActivity('You can check out the following videos');
                        await context.sendActivity('https://www.youtube.com/watch?v=t7RhG0CEbVw&feature=youtu.be');
                        await context.sendActivity('https://www.youtube.com/watch?v=Gmh_xMMJ2Pw&feature=youtu.be');
                        await context.sendActivity('https://www.youtube.com/watch?v=fuEuNNdi55Q&feature=youtu.be');
                    }
                }
                else{
                    await context.sendActivity('Thank you');
                }
                 step++;
                 await context.sendActivity('Want to know about near by gym');
                 await context.sendActivity('Enter yes or no');
            }
           else if(step==4){

                var ans= context.activity.text;
                if(ans=="Yes"){
                    https.get('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAPmDW6RHB_q1lx4neL_mHmhbEVZoNTRKw ', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
    await context.sendActivity('Error');
});

                }
                else if (ans =="No"){
                    await context.sendActivity('Thank you');
                    
                }
                step=0;
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
