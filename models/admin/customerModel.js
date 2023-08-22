const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Customer = sequelize.define('customer', {
	id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
	firstname: {
        type: Sequelize.STRING,
        allowNull: false,
	},
	lastname: {
		  type: Sequelize.STRING
  	},
	address: {
			type: Sequelize.STRING
	},
	age: {
			type: Sequelize.INTEGER
	},
	salary: {
			type: Sequelize.INTEGER
	}
});

module.exports = Customer;