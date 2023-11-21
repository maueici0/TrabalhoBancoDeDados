const express = require('express');
const ocorrenciaRouter = express.Router();
const ocorrenciaController = require('../controller/Ocorrencia.controller');

ocorrenciaRouter.post('/', ocorrenciaController.salvarOcorrencia);
ocorrenciaRouter.get("/",ocorrenciaController.listarOcorrencia);
ocorrenciaRouter.delete("/:id",ocorrenciaController.deletarOcorrencia);
ocorrenciaRouter.put("/:id",ocorrenciaController.atualizarOcorrencia);
ocorrenciaRouter.get("/:id",ocorrenciaController.obterOcorrencia);

module.exports = ocorrenciaRouter;