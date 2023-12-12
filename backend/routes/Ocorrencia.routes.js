const express = require('express');
const ocorrenciaRouter = express.Router();
const ocorrenciaController = require('../controller/Ocorrencia.controller');
const client = require('../database/redis');

// Middleware para limpar o cache antes de salvar uma nova ocorrência
async function clearCacheMiddleware(req, res, next) {
    // Gere a chave do cache correspondente à ocorrência específica
    const cacheKey = `ocorrencia:${req.params.id}`;
  
    // Remove a chave do cache
    client.del(cacheKey, (err, reply) => {
      if (err) {
        console.error('Erro ao limpar o cache:', err);
      } else {
        console.log('Cache limpo com sucesso:', reply);
      }
    });
  
    // Continue para o próximo middleware ou manipulador de rota
    next();
  }  

ocorrenciaRouter.post('/', clearCacheMiddleware, ocorrenciaController.salvarOcorrencia);
ocorrenciaRouter.get("/",ocorrenciaController.listarOcorrencia);
ocorrenciaRouter.delete("/:id", clearCacheMiddleware, ocorrenciaController.deletarOcorrencia);
ocorrenciaRouter.put("/:id", clearCacheMiddleware, ocorrenciaController.atualizarOcorrencia);
ocorrenciaRouter.get("/:id",ocorrenciaController.obterOcorrencia);

module.exports = ocorrenciaRouter;