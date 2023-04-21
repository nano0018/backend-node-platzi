const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { pool } = require('../libs/postgres.pool');
const sequelize = require('../libs/sequelize');

class ProductService {
  constructor() {
    this.products = [];
    this.pool = pool;
    this.pool.on('error', (error) => console.error(error));
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    const queryDB = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(queryDB);
    return data;
  }
  async findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found!');
    }
    if (product.isBlocked) {
      throw boom.conflict('The product is blocked');
    }

    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found!');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found!');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
