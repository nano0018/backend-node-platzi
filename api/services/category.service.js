const { faker } = require('@faker-js/faker');
const { pool } = require('../libs/postgres.pool');

class CategoryService {
  constructor() {
    this.categories = [];
    this.pool = pool;
    this.pool.on('error', (error) => console.error(error));
  }

  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  async find() {
    const queryDB = 'SELECT * FROM tasks';
    const res = await this.pool.query(queryDB);
    return res.rows;
  }
  findOne(id) {
    return this.categories.find((category) => category.id === id);
  }
  update(id, changes) {
    const index = this.categories.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const category = this.categories[index]
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }
  delete(id) {
    const index = this.categories.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoryService;
