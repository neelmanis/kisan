const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Master = sequelize.define('crop_master', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photo: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['1', '0']
  }
});

module.exports = Master;