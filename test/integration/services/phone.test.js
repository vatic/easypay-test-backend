/* eslint-env mocha */
process.env.NODE_ENV = 'test';
const { assert } = require('chai');
const R = require('ramda');
const knex = require('../../../src/db/knex');
const { fakePhone, fakePhones } = require('../../util');


const {
  listPhones,
  addPhone,
  removePhone,
  checkPhone,
  deleteAllPhones,
  numberOfRows,
} = require('../../../src/services/phone');

describe('Integration', () => {
  describe('Phone Service', () => {

    // const tableName = 'phones';

    beforeEach(async () => await deleteAllPhones());
    // afterEach(async () => await deleteAllPhones());

    describe('#listPhones', () => {
      it('should return list of phones', async () => {
        const phones = fakePhones(5);
        phones.map(async (phone) => {
          await addPhone(phone);
        });
        assert.lengthOf(phones, 5);
        const res = await listPhones(0);
        setTimeout(() => {
          assert.isArray(res);
          assert.lengthOf(res, 5);
          assert.strictEqual(R.pluck('phone')(res), phones);
        }, 1000);
      });
    });

    describe('#addPhone', () => {
      it('should insert valid phone', async () => {
        const phone = fakePhone('-');
        const res = await addPhone(phone);
        assert.strictEqual(res.command, 'INSERT');
        assert.strictEqual(res.rowCount, 1);
        const insertedPhone = (await checkPhone(phone)).phones[0].phone;
        assert.strictEqual(insertedPhone, phone);
      });
      it('should not insert invalid phone', async () => {
        const phone = '123456789';
        const res = await addPhone(phone);
        assert.isObject(res);
        assert.strictEqual(res.msg, `Phone: ${phone} is not valid`)
        assert.strictEqual(res.status, 422);
      });
    });
    describe('#removePhone', () => {
      it('should remove phone that exists in db', async () => {
        const phoneForDel = fakePhone('-');
        await addPhone(phoneForDel);
        const numOfRows = (await numberOfRows())[0].count;
        const res = await removePhone(phoneForDel);
        const numOfRowsAfterDel = (await numberOfRows())[0].count;
        assert.isObject(res);
        assert.strictEqual(res.msg, 'Phone is deleted');
        assert.strictEqual(parseInt(numOfRowsAfterDel + 1, 10), parseInt(numOfRows, 10));
      });
      it('should show error message if phone does not exists in db', async () => {
        const phoneForDel = fakePhone('-');
        const numOfRows = (await numberOfRows())[0].count;
        const res = await removePhone(phoneForDel);
        const numOfRowsAfterDel = (await numberOfRows())[0].count;
        assert.isObject(res);
        assert.strictEqual(res.msg, 'Phone is not deleted');
        assert.strictEqual(res.status, 422);
        assert.strictEqual(parseInt(numOfRowsAfterDel, 10), parseInt(numOfRows, 10));
      });
    });
  });
});
