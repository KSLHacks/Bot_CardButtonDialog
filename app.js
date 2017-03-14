var restify = require('restify')
var builder = require('botbuilder')

// =========================================================
// Bot Setup
// =========================================================

// Setup Restify Server
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url)
})

// Create chat bot
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})
var bot = new builder.UniversalBot(connector)
server.post('/api/messages', connector.listen())

// =========================================================
// Bots Dialogs
// =========================================================

// Define the event when action 'Profile' is called via the HaroCard button
// When action 'Profile' is called, dialog '/profile' will be added to the Dialog Stack
bot.beginDialogAction('Profile', '/profile')
bot.beginDialogAction('End', '/end')

// Root dialog, conversation Begins Here!
bot.dialog('/', function (session) {
  session.send('Hello World')
  session.beginDialog('/cards')
})

// Dialog we wish to trigger via the button
bot.dialog('/profile', [
  function (session) {
    builder.Prompts.text(session, 'Hi! What is your name?')
  },
  function (session, results) {
    session.userData.name = results.response
    session.send('Hello ' + session.userData.name)
    session.endDialog()
  }
])

// Dialog we wish to trigger via the button
bot.dialog('/end', [
  function (session) {
    if (session.userData.name) {
      session.send('Goodbye! ' + session.userData.name)
    } else {
      session.send('Goodbye!')
    }
    session.endDialog()
  }
])

// RichCard dialog with HeroCard
bot.dialog('/cards', [
  function (session) {
    // Define the array of buttons with the corresponding actions, in this case, we wish to execute action 'Profile' with argument null
    var buttonList = [builder.CardAction.dialogAction(session, 'Profile', null, 'Profile'),
      builder.CardAction.dialogAction(session, 'End', null, 'end')]
    var msg = new builder.Message(session)
        .textFormat(builder.TextFormat.xml)
        .attachments([
          new builder.HeroCard(session)
                .title('Hero Card')
                .subtitle('Space Needle')
                .text('The Space Needle is an observation tower in Seattle, Washington, a landmark of the Pacific Northwest, and an icon of Seattle.')
                .images([
                  builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Seattlenighttimequeenanne.jpg/320px-Seattlenighttimequeenanne.jpg')
                ])
                // display the array of button + actions here (only one defined, mapped to an action on line #28)
                .buttons(buttonList)
        ])
    // exit dialog and send message.
    // When the user clicks on the button, the new '/profile dialog will be added to the Dialog Stack (on top of root ('/'))
    session.endDialog(msg)
  }
])
