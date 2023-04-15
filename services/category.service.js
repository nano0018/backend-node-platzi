const { faker } = require('@faker-js/faker');

class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }
  generate() {
    const limit = 20;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        img: faker.image.imageUrl(),
      });
    }
  }
  create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  find() {
    return this.categories;
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
