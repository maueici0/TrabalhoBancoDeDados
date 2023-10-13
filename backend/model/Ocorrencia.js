const sequelize = require('../database/sequelize');
const { DataTypes } = require('sequelize');

const Ocorrencias = sequelize.define('Ocorrencias', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4
    },
    titulo: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    localizacao: {
        type: DataTypes.GEOMETRY,
        allowNull: false
    }
}, {});

async function sincronizar() {
    try {
        await Ocorrencias.sync();
        console.log('Tabela Ocorrencias sincronizada!');
    } catch (error) {
        console.log(`Erro na conexão: ${error}`);
    }
} sincronizar();

module.exports = Ocorrencias;