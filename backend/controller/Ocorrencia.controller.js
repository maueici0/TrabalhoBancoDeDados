const Ocorrencia = require('../model/Ocorrencia');
const client = require('../database/redis');

module.exports.listarOcorrencia = async function (req, res) {
  const ocorrencias = await Ocorrencia.find({});
  res.status(200).send(ocorrencias);

  //Recuperar a contagem em tempo real por tipo
  const contagemPorTipo = await obterContagemPorTipo();
  res.status(200).send({ ocorrencias, contagemPorTipo });
};

module.exports.salvarOcorrencia = async function (req, res) {
  const ocorrencia = await Ocorrencia.create(req.body);
  res.status(201).send(ocorrencia);

  //Atualizar contagem em tempo real ao adicionar nova ocorrencia
  await atualizarContagemPorTipo (req.body.tipo);
  res.status(201).send(ocorrencia);
};

module.exports.deletarOcorrencia = async function (req, res) {
  const ocorrencia = await Ocorrencia.findByIdAndDelete(req.params.id);
  if (!ocorrencia) {
    res.status(404).send({ error: "Ocorrencia não encontrada" });
    return;
  }
  res.status(200).send({ message: "Ocorrencia deletada com sucesso" });

  //Atualizar contagem em tempo real ao deletar ocorrencia
  await atualizarContagemPorTipo (ocorrencia.tipo, -1);
  res.status(200).send({ message: "Ocorrencia deletada com sucesso" });
};

  module.exports.atualizarOcorrencia = async function (req, res) {
    const ocorrencia = await Ocorrencia.findById(req.params.id);
    if (!ocorrencia) {
      res.status(404).send({ error: "Ocorrencia não encontrada" });
      return;
    }
    const retorno = await Ocorrencia.findByIdAndUpdate(
      req.params.id, req.body, { new: true });
    res.status(200).send(retorno);
  }

module.exports.obterOcorrencia = async function (req, res) {
  const ocorrencia = await Ocorrencia.findById(req.params.id);
  if (!ocorrencia) {
    res.status(404).send({ error: "Ocorrencia não encontrada" });
    return;
  }
  res.status(200).send(ocorrencia);
}

// Função para atualizar a contagem em tempo real por tipo
async function atualizarContagemPorTipo(tipo, incremento = 1) {
  try {
    const cacheKey = `contagem_por_tipo:${tipo}`;
    const contagemAtual = await client.incrby(cacheKey, incremento);
    // Define uma expiração para a chave se ela não existir
    if (incremento > 0) {
      await client.expire(cacheKey, 3600); // Expira em 1 hora
    }
    return contagemAtual;
  } catch (error) {
    console.error("Erro ao atualizar contagem por tipo:", error);
    throw error;
  }
}

// Função para obter a contagem em tempo real por tipo
async function obterContagemPorTipo() {
  try {
    const tipos = ['Roubo', 'Furto', 'Acidente', 'Incêndio', 'Outros'];
    const contagem = {};
    
    for (const tipo of tipos) {
      const cacheKey = `contagem_por_tipo:${tipo}`;
      const valor = await client.get(cacheKey) || 0;
      contagem[tipo] = parseInt(valor, 10);
    }

    return contagem;
  } catch (error) {
    console.error("Erro ao obter contagem por tipo:", error);
    throw error;
  }
}