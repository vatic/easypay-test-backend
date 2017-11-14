const faker = require('faker');

exports.seed = (knex) => {
  const tableName = 'phones';
  // Deletes ALL existing entries
  return knex(tableName).truncate()
    .then(() => {
      // Inserts seed entries
      const tempAry = [...Array(10).keys()];
      const phones = tempAry.map(() => ({ phone: faker.phone.phoneNumber('###-###-####') }));
      return knex(tableName).insert(phones);
    });
};
