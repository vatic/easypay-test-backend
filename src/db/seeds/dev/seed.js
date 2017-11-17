const faker = require('faker');

exports.seed = (knex) => {
  const tableName = 'phones';
  // Deletes ALL existing entries
  return knex(tableName).truncate()
    .then(() => {
      // Inserts seed entries
      const tempAry = [...Array(5).keys()];
      const phones911 = tempAry.map(() => ({ phone: faker.phone.phoneNumber('911-###-####') }));
      const phones921 = tempAry.map(() => ({ phone: faker.phone.phoneNumber('921-###-####') }));
      const phones904 = tempAry.map(() => ({ phone: faker.phone.phoneNumber('904-###-####') }));
      return knex(tableName).insert([...phones911, ...phones921, ...phones904]);
    });
};
