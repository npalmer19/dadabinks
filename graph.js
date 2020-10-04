// Create an options object with the same scopes from the login
const options =
  new MicrosoftGraph.MSALAuthenticationProviderOptions([
    'user.read',
    'mail.read'
  ]);
// Create an authentication provider for the implicit flow
const authProvider =
  new MicrosoftGraph.ImplicitMSALAuthenticationProvider(msalClient, options);
// Initialize the Graph client
const graphClient = MicrosoftGraph.Client.initWithMiddleware({authProvider});

var page = 0; 

var pagename = "inbox";


async function getEvents() {
  try {
    let events = await graphClient
        .api('/me/mailFolders/' + pagename + '/messages?$select=sender%2csubject&$skip=' + page)
        .select('id, subject, sender, bodyPreview')
        .get();


    updatePage(msalClient.getAccount(), Views.calendar, events);
    //sendEmail(events);
  } catch (error) { 
    updatePage(msalClient.getAccount(), Views.error, {
      message: 'Error getting events',
      debug: error
    });
  }
}

