const knex = require('../db/knex');

// In-memory datastores:
const oauthAccessTokens = [];
const oauthRefreshTokens = [];
const oauthClients = [
  {
    clientId: 'react',
    clientSecret: 'admin',
    redirectUri: '',
  },
];
const authorizedClientIds = {
  password: [
    'react',
  ],
  refresh_token: [
    'react',
  ],
};
const users = [
  {
    id: '123',
    username: 'admin',
    password: 'admin',
  },
];


// Debug function to dump the state of the data stores
const dump = () => {
  console.log('oauthAccessTokens', oauthAccessTokens);
  console.log('oauthClients', oauthClients);
  console.log('authorizedClientIds', authorizedClientIds);
  console.log('oauthRefreshTokens', oauthRefreshTokens);
  console.log('users', users);
};

  /*
  * Required
  */
const getAccessToken = (bearerToken, callback) => {
  for (let i = 0, len = oauthAccessTokens.length; i < len; i++) {
    const elem = oauthAccessTokens[i];
    if (elem.accessToken === bearerToken) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

const getRefreshToken = (bearerToken, callback) => {
  for (let i = 0, len = oauthRefreshTokens.length; i < len; i++) {
    const elem = oauthRefreshTokens[i];
    if (elem.refreshToken === bearerToken) {
      return callback(false, elem);
    }
  }
  callback(false, false);
};

const getClient = (clientId, clientSecret, callback) => {
  // for (let i = 0, len = oauthClients.length; i < len; i++) {
  //   const elem = oauthClients[i];
  //   if (elem.clientId === clientId &&
  //     (clientSecret === null || elem.clientSecret === clientSecret)) {
  //     return callback(false, elem);
  //   }
  // }
  // callback(false, false);
  const client = {
    clientId: 'react',
    clientSecret: null,
    redirectUri: '',
  };
  return callback(false, client);
};

const grantTypeAllowed = (clientId, grantType, callback) => {
  callback(false, authorizedClientIds[grantType] &&
    authorizedClientIds[grantType].indexOf(clientId.toLowerCase()) >= 0);
};

const saveAccessToken = (accessToken, clientId, expires, userId, callback) => {
  oauthAccessTokens.unshift({
    accessToken,
    clientId,
    userId,
    expires,
  });
  callback(false);
};

const saveRefreshToken = (refreshToken, clientId, expires, userId, callback) =>{
  oauthRefreshTokens.unshift({
    refreshToken,
    clientId,
    userId,
    expires,
  });

  callback(false);
};

/*
* Required to support password grant type
*/
const getUser = async (username, password, callback) => {
  const query = 'select * from users where username=? and password=crypt(?, password)';

  try {
    const result = (await knex.raw(query, [username, password]));
    console.log(result);
    callback(false, result.rowCount ? result.rows[0] : false);
  } catch (error) {
    callback(error, false);
  }


  // for (let i = 0, len = users.length; i < len; i++) {
  //   const elem = users[i];
  //   if (elem.username === username && elem.password === password) {
  //     return callback(false, elem);
  //   }
  // }
};

module.exports = {
  dump,
  getAccessToken,
  getRefreshToken,
  getClient,
  grantTypeAllowed,
  saveAccessToken,
  saveRefreshToken,
  getUser,
};
