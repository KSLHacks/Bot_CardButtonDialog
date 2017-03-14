# Bot_CardButtonDialog

#### Kevin Leung @KSLHacks - Microsoft Technical Evangelist

### Problem
Demo code for clicking a rich card button and triggering a dialog to begin. This allows us to provide the user information via rich cards, as well as determine the next action that will provide the user with the correct dialog/information. The goal is to create a more natural human-to-bot experience. The alternative would be to provide the rich card, then prompt the user for dialog options (2 steps) instead of one.

### Code
There are three main parts to this solution which will help organize your code.

#### 1. Define the Action
When the user presses a button, the rich card will return a dialog action to the bot ([read more about dialogActions here](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.cardaction.html#dialogaction)). The bot requires us to define the action so the bot knows what events to execute when the action is called. There are different [actions available](https://docs.botframework.com/en-us/node/builder/chat-reference/modules/_botbuilder_d_.html) to developers, but we will stick to the beginDialogAction() for now.

The code will look like this:

`bot.beginDialogAction('Profile', '/profile')`

Also keep in mind, if you wish to have multiple buttons corresponding to different actions, you must define them seperately. The demo code I included has two buttons each with their own action defined. (refer to the code)

#### 2. Create the buttons to trigger the Action
Either as a global variable, or inside your card function, you must define the array of actions for you to make available to the user. In this example, the dialogAction has four parameters: 
1. session (passed in from the calling dialog)
2. action name (String must match step #1)
3. action parameters to pass (null in this example)
4. The title (the string that appears on the button).

`var buttonList = [builder.CardAction.dialogAction(session, 'Profile', null, 'Profile')]`

#### 3. Include the buttons in the rich card
The last step is to add the buttons option to the card. Each array item will correspond to seperate buttons. See my example of the hero card in the code (I include two buttons). [Read more about cards](https://docs.botframework.com/en-us/node/builder/chat/session/#cards)

`.buttons(buttonList)`

### Conversation Example
![Bot Conversation Example](conversation.png)
