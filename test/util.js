const faker = require('faker');

const fakePhone = () => faker.phone.phoneNumber('###-###-####');
const fakePhones = num =>
  [...Array(num).keys()].map(() => faker.phone.phoneNumber('###-###-####'));

const uri = endpoint => `http://localhost:8080/${endpoint}`;

const loginOptions = {
  uri: uri('login'),
  method: 'POST',
  headers: {
    'User-Agent': 'Request-Promise',
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const logoutOptions = {
  uri: uri('logout'),
  method: 'POST',
  headers: {
    'User-Agent': 'Request-Promise',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const credentials = {
  username: 'admin',
  password: 'admin',
  grant_type: 'password',
  client_id: 'react',
  client_secret: null,
};

const wrongCredentials = {
  username: 'user',
  password: 'user',
  grant_type: 'password',
  client_id: 'react',
  client_secret: null,
};

const urlEncoded = o => Object.keys(o).map(k => `${k}=${o[k]}`).join('&');

module.exports = {
  fakePhone,
  fakePhones,
  loginOptions,
  logoutOptions,
  credentials,
  wrongCredentials,
  urlEncoded,
};
