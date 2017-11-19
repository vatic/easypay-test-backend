/* eslint-env mocha */
process.env.NODE_ENV = 'test';
const rp = require('request-promise');
const { assert } = require('chai');
const { seed } = require('../../../src/db/seeds/dev/seed');
const knex = require('../../../src/db/knex');
const { addPhone } = require('../../../src/services/phone');
const { fakePhone } = require('../../util');
const { credentials, urlEncoded, loginOptions } = require('../../util');

let token = '';

const uri = endpoint => `http://localhost:8080/${endpoint}`;
const options = {
  method: 'GET',
  headers: {
    'User-Agent': 'Request-Promise',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

describe('E2E', () => {
  describe('Phone Routes', () => {
    before(async () => {
      await seed(knex);
    });

    afterEach(async () => {
      // await deleteAllPhones();
    });

    describe('GET /phones/check', () => {
      it('should return object with phones beginning on 921', async () => {
        const opt = Object.assign({}, options, { uri: uri('phones/check/921') });
        const res = JSON.parse(await rp(opt));
        assert.isObject(res);
        assert.isArray(res.phones);
        assert.strictEqual(res.phones.length, 5); // in seed file - 5 of '921'
      });
      it('should return object with array with one inserted element', async () => {
        const phone = fakePhone('-');
        await addPhone(phone);
        const opt = Object.assign({}, options, { uri: uri(`phones/check/${phone}`) });
        const res = JSON.parse(await rp(opt));
        assert.isObject(res);
        assert.isArray(res.phones);
        assert.strictEqual(res.phones.length, 1);
        assert.strictEqual(res.phones[0].phone, phone);
      });
    });

    describe('GET /phones', () => {
      before(async () => {
        const validCredentials = urlEncoded(credentials);
        const opt = Object.assign({}, loginOptions, { body: validCredentials });
        const res = JSON.parse(await rp(opt));
        token = res.access_token;
      });

      it('should return list of phones with valid token', async () => {
        const opt = Object.assign({}, options, {
          uri: uri('phones'),
          headers: Object.assign({}, options.headers, { Authorization: `Bearer ${token}` }),
        });
        const res = JSON.parse(await rp(opt));
        assert.isArray(res);
        assert.isObject(res[0]);
        assert.property(res[0], 'id');
        assert.property(res[0], 'phone');
        assert.isNumber(res[0].id);
        assert.isString(res[0].phone);
      });
    });
  });
});
