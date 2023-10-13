const express = require('express');
const ocorrenciaRouter = express.Router();
const ocorrenciaController = require('../controller/Ocorrencia.controller');

ocorrenciaRouter.post('/', ocorrenciaController.salvarOcorrencia);
ocorrenciaRouter.get("/",ocorrenciaController.listarOcorrencia)

module.exports = ocorrenciaRouter;