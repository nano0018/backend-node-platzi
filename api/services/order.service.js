const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async createOrderProduct(data) {
    const newOrderProduct = await models.OrderProduct.create(data);
    return newOrderProduct;
  }

  async find() {
    const res = await models.Order.findAll();
    return res;
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ],
    });
    if (!order) {
      throw boom.notFound('order not found!');
    }
    return order;
  }
  async update(id, changes) {
    const order = await this.findOne(id);
    const updates = await order.update(changes);
    return updates;
  }
  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
