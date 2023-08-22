const { DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

// Define the News model
const News = sequelize.define('news', {
  newsId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortDesc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['1', '0']
  }
});

module.exports = News;
