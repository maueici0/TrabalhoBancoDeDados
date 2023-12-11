require ('dotenv').config();
const redis = require('redis');
const createClient = require('redis').createClient;
const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

async function conectar(){
    await client.connect();
    client.on('error',err =>{
        console.log('Erro: '+err);
    });
    console.log('Conectado com o Redis');
}

conectar();

module.exports = client;