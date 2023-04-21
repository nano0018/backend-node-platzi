const { faker } = require('@faker-js/faker');
const { pool } = require('../libs/postgres.pool');
class UserService {
  constructor() {
    this.users = [];
    this.pool = pool;
    this.pool.on('error', (error) => console.error(error));
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
    const queryDB = 'SELECT * FROM tasks';
    const res = await this.pool.query(queryDB);
    return res.rows;
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
