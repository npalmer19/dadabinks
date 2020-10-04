const msalConfig = {
  auth: {
    clientId: 'c824ef69-93ed-4f9c-b717-ab57e5cf0551',
    redirectUri: 'http://localhost:8080'
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    forceRefresh: false
  }
};

const loginRequest = {
  scopes: [
    'openid',
    'profile',
    'user.read',
    'calendars.read'
  ]
}

