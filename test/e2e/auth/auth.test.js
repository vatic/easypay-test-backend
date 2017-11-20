/* eslint-env mocha */
process.env.NODE_ENV = 'test';
const rp = require('request-promise');
const { assert } = require('chai');
const {
  credentials,
  wrongCredentials,
  urlEncoded,
  loginOptions,
  logoutOptions,
} = require('../../util');

describe('E2E', () => {
  describe('Auth', () => {
    describe('/login', () => {
      it('should return json with token with valid credentials', async () => {
        const validCredentials = urlEncoded(credentials);
        const opt = Object.assign({}, loginOptions, { body: validCredentials });
        const res = JSON.parse(await rp(opt));
        assert.isObject(res);
        assert.property(res, 'access_token');
        assert.property(res, 'token_type');
        assert.property(res, 'expires_in');
        assert.isString(res.token_type);
        assert.isString(res.access_token);
        assert.isNumber(parseInt(res.expires_in, 10));
      });
      it('should return error with invalid credentials', async () => {
        const invalidCredentials = urlEncoded(wrongCredentials);
        const opt = Object.assign({}, loginOptions, {
          body: invalidCredentials,
          resolveWithFullResponse: true,
          simple: false,
        });
        const res = (await rp(opt));
        assert.isNumber(parseInt(res.statusCode, 10));
        assert.strictEqual(parseInt(res.statusCode, 10), 500);
        assert.include(res.body, 'User credentials are invalid');
      });
    });

    describe('/logout', () => {
      it('should logout by removing token from db', async () => {
        const validCredentials = urlEncoded(credentials);
        const loginOpt = Object.assign({}, loginOptions, { body: validCredentials });
        const loginRes = JSON.parse(await rp(loginOpt));
        const token = loginRes.access_token;
        const opt = Object.assign({}, logoutOptions, {
          headers: Object.assign({}, logoutOptions.headers, { Authorization: `Bearer ${token}` }),
          body: JSON.stringify({ token }),
        });
        // console.dir(opt);
        const res = JSON.parse(await rp(opt));
        assert.isObject(res);
        assert.property(res, 'msg');
        assert.strictEqual(res.msg, '1 Token is deleted');
      });
    });
  });
});
