const {DATABASE, USUARIO, SENHA, PORTA, HOST} = require("./config")
const { Sequelize } = require('sequelize');
require ('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.USUARIO, process.env.SENHA, {
    host: process.env.HOST,
    dialect: 'postgres'
});

async function conectar() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} 
conectar();

module.exports = sequelize;