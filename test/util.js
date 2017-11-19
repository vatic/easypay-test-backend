const faker = require('faker');

const fakePhone = ch => faker.phone.phoneNumber(`###${ch}###${ch}####`);
const fakePhones = () =>
  [...Array(5).keys()].map(() => ({ phone: faker.phone.phoneNumber('###-###-####') }));

module.exports = {
  fakePhone,
  fakePhones,
};
