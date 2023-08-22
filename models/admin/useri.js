const { DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

// Define the User model
const Useri = sequelize.define('useri', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['1', '0']
  }
});

module.exports = Useri;
