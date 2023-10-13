require ('dotenv').config()
const DATABASE = process.env.DATABASE
const USUARIO = process.env.USUARIO
const SENHA = process.env.SENHA
const PORTA = process.env.PORTA
const HOST = process.env.HOST
module.exports = {DATABASE, USUARIO, SENHA, PORTA, HOST}