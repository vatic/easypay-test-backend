const faker = require('faker');

const fakePhone = ch => faker.phone.phoneNumber(`###${ch}###${ch}####`);
const fakePhones = num =>
  [...Array(num).keys()].map(() => faker.phone.phoneNumber('###-###-####'));

module.exports = {
  fakePhone,
  fakePhones,
};
