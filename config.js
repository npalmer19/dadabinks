const msalConfig = {
  auth: {
    clientId: 'ee60ca03-9485-4238-8bca-596a182f2065',
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

