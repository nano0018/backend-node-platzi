const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CategoryService {
  constructor() {
    this.categories = [];
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async find() {
    const res = await models.Category.findAll();
    return res;
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('category not found!');
    }
    return category;
  }
  async update(id, changes) {
    const category = await this.findOne(id);
    const updates = await category.update(changes);
    return updates;
  }
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
