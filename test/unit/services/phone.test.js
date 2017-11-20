/* eslint-env mocha */
const { assert } = require('chai');
const { fakePhone, fakePhones } = require('../../util');

process.env.NODE_ENV = 'test';

const {
  verifyPhone,
  notValid,
  notFound,
  found,
  checkFindResults,
  deleted,
  notDeleted,
  checkDeleteResults,
  res500,
} = require('../../../src/services/phone');


describe('Unit', () => {
  describe('Phone Service', () => {
    describe('verifyPhone', () => {
      it('should return true on valid phone', () => {
        const phone = fakePhone('-');
        assert.isOk(verifyPhone(phone), `Phone ${phone} is valid`);
      });
      it('should return false on not valid phone', () => {
        const wrongPhone = '911-234-45-32';
        assert.isNotOk(verifyPhone(wrongPhone), `Phone ${wrongPhone} is not valid`);
      });
    });
  
    describe('notValid', () => {
      const wrongPhone = '911-234-45-32';
      it('should return promise with right message', async () => {
        const expected = { msg: `Phone: ${wrongPhone} is not valid`, status: 422 };
        const actual = await notValid(wrongPhone);
        assert.deepEqual(actual, expected);
      });
    });
  
    describe('notFound', () => {
      it('should return promise with right message', async () => {
        const expected = { error: 'Phone is not found' };
        const actual = await notFound();
        assert.deepEqual(actual, expected);
      });
    });
  
    describe('found', () => {
      it('should return promise with right message', async () => {
        const phones = fakePhones();
        const expected = { phones };
        const actual = await found(phones);
        assert.deepEqual(actual, expected);
      });
    });
  
    describe('checkfindResult', () => {
      it('should return false on undefined', () => {
        let tmp;
        assert.isNotOk(checkFindResults(tmp));
      });
      it('should return true on not undefined', () => {
        const o = { a: 1 };
        assert.isOk(checkFindResults(o));
      });
    });
  
    describe('deleted', () => {
      it('should return promise with right message', async () => {
        const expected = { msg: '1 Phone is deleted' };
        const actual = await deleted(1);
        assert.deepEqual(actual, expected);
      });
    });
  
    describe('notDeleted', () => {
      it('should return promise with right message', async () => {
        const expected = { msg: 'Phone is not deleted', status: 422 };
        const actual = await notDeleted();
        assert.deepEqual(actual, expected);
      });
    });
  
    describe('checkDeleteResult', () => {
      it('should return false on zero', () => {
        assert.isNotOk(checkDeleteResults(0));
      });
      it('should return true on positive integer', () => {
        assert.isOk(checkDeleteResults(1));
      });
    });
    describe('res500', () => {
      it('should return promise with right message', async () => {
        const expected = { msg: 'Wrong parameters', status: 500 };
        const actual = await res500();
        assert.deepEqual(actual, expected);
      });
    });
  });
});
