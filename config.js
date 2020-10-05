const msalConfig = {
  auth: {
    clientId: '03f59324-14ec-41ea-bf4d-da087c93fdf9',
    redirectUri: 'https://npalmer19.github.io/dadabinks/'
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

