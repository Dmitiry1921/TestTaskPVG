const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Stuff = sequelize.define('Stuff', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	phone: {
		type: DataTypes.STRING
	},

});

module.exports = Stuff;
