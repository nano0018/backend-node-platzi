const { faker } = require('@faker-js/faker');
const { getDBConnection } = require('../libs/postgres');
class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        username: `${faker.hacker.noun()}${faker.random.numeric(3)}`,
        age: faker.random.numeric(2),
      });
    }
  }
  create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }
  async find() {
    const client = await getDBConnection();
    const queryDB = await client.query('SELECT * FROM tasks');
    return queryDB.rows;
  }
  findOne(id) {
    return this.users.find((user) => user.id === id);
  }
  update(id, changes) {
    const index = this.users.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const product = this.users[index];
    this.users[index] = {
      ...product,
      ...changes,
    };
    return this.users[index];
  }
  delete(id) {
    const index = this.users.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UserService;
