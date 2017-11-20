/* eslint-env mocha */
process.env.NODE_ENV = 'test';
const rp = require('request-promise');
const { assert } = require('chai');
const {
  credentials,
  wrongCredentials,
  urlEncoded,
  loginOptions,
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
  });
});
