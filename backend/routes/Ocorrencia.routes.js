const express = require('express');
const ocorrenciaRouter = express.Router();
const ocorrenciaController = require('../controller/Ocorrencia.controller');

ocorrenciaRouter.post('/', ocorrenciaController.atualizarContagemPorTipo ,ocorrenciaController.salvarOcorrencia);
ocorrenciaRouter.get("/", ocorrenciaController.obterContagemPorTipo,ocorrenciaController.listarOcorrencia);
ocorrenciaRouter.delete("/:id", ocorrenciaController.atualizarContagemPorTipo, ocorrenciaController.deletarOcorrencia);
ocorrenciaRouter.put("/:id",ocorrenciaController.atualizarOcorrencia);
ocorrenciaRouter.get("/:id",ocorrenciaController.obterOcorrencia);

module.exports = ocorrenciaRouter;