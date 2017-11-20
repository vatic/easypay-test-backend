/* eslint-env mocha */
process.env.NODE_ENV = 'test';
const { assert } = require('chai');
// const R = require('ramda');

const {
  getToken,
  saveToken,
  deleteAllTokens,
  removeToken,
} = require('../../../src/services/auth');

describe('Integration', () => {
  describe('Auth Service', () => {
    beforeEach(async () => {
      await deleteAllTokens();
    });

    afterEach(async () => {
      await deleteAllTokens();
    });

    describe('#getToken', () => {
      it('should return object with token info if token exists in db', async () => {
        const token = '1ca8d937c2e916d1d85a34bc0cf54148a6d55ea1';
        await saveToken(token, 'react', '2017-11-21 00:00:00.000', { id: 1 });
        const res = await getToken(token);
        assert.isObject(res);
        assert.property(res, 'accessToken');
        assert.property(res, 'clientId');
        assert.property(res, 'expires');
        assert.property(res, 'userId');
        assert.property(res, 'userId');
        assert.strictEqual(res.accessToken, token);
      });
    });
    describe('#removeToken', () => {
      it('should return true if token exists in db', async () => {
        const token = '1ca8d937c2e916d1d85a34bc0cf54148a6d55ea1';
        await saveToken(token, 'react', '2017-11-21 00:00:00.000', { id: 1 });
        const res = await removeToken(token);
        assert.isObject(res);
        assert.property(res, 'msg');
        assert.strictEqual(res.msg, '1 Token is deleted');
      });
    });
  });
});
