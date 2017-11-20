/* eslint-env mocha */
process.env.NODE_ENV = 'test';
const { assert } = require('chai');
const R = require('ramda');
const { fakePhone, fakePhones } = require('../../util');


const {
  listPhones,
  addPhone,
  removePhone,
  checkPhone,
  deleteAllPhones,
  numOfRows,
  insertPhones,
} = require('../../../src/services/phone');

describe('Integration', () => {
  describe('Phone Service', () => {
    
    beforeEach(async () => {
      await deleteAllPhones();
    });

    afterEach(async () => {
      await deleteAllPhones();
    });

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
        const rowsCount = await numOfRows();
        const res = await removePhone(phoneForDel);
        const rowsCountAfterDel = await numOfRows();
        assert.isObject(res);
        assert.strictEqual(res.msg, '1 Phone is deleted');
        assert.strictEqual(parseInt(rowsCountAfterDel + 1, 10), parseInt(rowsCount, 10));
      });
      it('should show error message if phone does not exists in db', async () => {
        const phoneForDel = fakePhone('-');
        const rowsCount = await numOfRows();
        const res = await removePhone(phoneForDel);
        const rowsCountAfterDel = await numOfRows();
        assert.isObject(res);
        assert.strictEqual(res.msg, 'Phone is not deleted');
        assert.strictEqual(res.status, 422);
        assert.strictEqual(parseInt(rowsCountAfterDel, 10), parseInt(rowsCount, 10));
      });
    });
    
    describe('#checkPhone', () => {
      it('should return phone if it exists in db', async () => {
        const phoneForCheck = fakePhone('-');
        await addPhone(phoneForCheck);
        const res = (await checkPhone(phoneForCheck)).phones[0].phone;
        assert.isString(res);
        assert.strictEqual(res, phoneForCheck);
      });
      it('should return empty array if phone does not exists in db', async () => {
        const phoneForCheck = fakePhone('-');
        const res = (await checkPhone(phoneForCheck)).phones;
        assert.isArray(res);
        assert.strictEqual(res.length, 0);
      });
    });

    describe('#deleteAllPhones', () => {
      it('should truncate the db table', async () => {
        const aryPhones = fakePhones(5);
        const phones = aryPhones.map(phone => ({ phone }));
        await insertPhones(phones);
        const rowsCount = await numOfRows();
        const res = (await deleteAllPhones());
        const rowsCountAfterDel = await numOfRows();
        
        assert.lengthOf(aryPhones, 5);
        assert.isObject(res);
        assert.strictEqual(parseInt(rowsCountAfterDel + 5, 10), parseInt(rowsCount, 10));
        assert.strictEqual(res.command, 'TRUNCATE');
      });
    });

    describe('#numberOfRows', () => {
      it('should return number of rows', async () => {
        const numberOfPhones = 10;
        const aryPhones = fakePhones(numberOfPhones);
        const phones = aryPhones.map(phone => ({ phone }));
        await insertPhones(phones);
        const rowsCount = await numOfRows();

        assert.isNumber(rowsCount);
        assert.strictEqual(rowsCount, numberOfPhones);
      });
    });
  });
});
