const Ocorrencia = require('../model/Ocorrencia');
const client = require('../database/redis');

module.exports.listarOcorrencia = async function (req, res) {
  try {
    if (req.cacheData) {
      console.log('Dados do cache disponíveis na rota:', req.cacheData);
      return res.json(req.cacheData);
    }

    const lista = await Ocorrencia.find();

    // Atualizar o cache com os dados do MongoDB
    const cacheKey = '/ocorrencia';
    client.setEx(cacheKey, 3600, JSON.stringify(lista));

    res.json(lista);
  } catch (err) {
    console.error('Erro ao buscar dados do MongoDB:', err);
    res.status(500).json({ error: 'Erro ao buscar dados do MongoDB' });
  }
};

module.exports.salvarOcorrencia = async function (req, res) {
  try {
    // Cria uma nova ocorrência no banco de dados
    const ocorrencia = await Ocorrencia.create(req.body);

    // Adiciona a ocorrência ao cache
    const cacheKey = `ocorrencia:${ocorrencia._id}`;
    client.setEx(cacheKey, 3600, JSON.stringify(ocorrencia));

    // Responde com a ocorrência criada
    res.status(201).send(ocorrencia);
  } catch (error) {
    console.error('Erro ao salvar a ocorrência:', error);
    res.status(500).send({ error: 'Erro interno do servidor ao salvar a ocorrência' });
  }
};

module.exports.deletarOcorrencia = async function (req, res) {
  const ocorrencia = await Ocorrencia.findByIdAndDelete(req.params.id);
  if (!ocorrencia) {
    res.status(404).send({ error: "Ocorrencia não encontrada" });
    return;
  }
  client.del(`ocorrencia:${req.params.id}`);
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
  client.setEx(`ocorrencia:${req.params.id}`, 3600, JSON.stringify(retorno));
  res.status(200).send(retorno);
}

module.exports.obterOcorrencia = async function (req, res) {
  const cacheKey = `ocorrencia:${req.params.id}`;  
  // Verifica se os dados estão no cache
  client.get(cacheKey).then(async (cachedData) => {
    if (cachedData != null) {
      // Cache hit
      const ocorrencia = JSON.parse(cachedData);
      res.status(200).send(ocorrencia);
      return 
    } else {
      // Cache miss, busca dados no banco de dados
      const ocorrencia = await Ocorrencia.findById(req.params.id);
      if (!ocorrencia) {
        res.status(404).send({ error: "Ocorrência não encontrada" });
        return;
      }
      // Atualiza o cache com os dados recuperados
      client.setEx(cacheKey, 3600, JSON.stringify(ocorrencia)); // Define o tempo de expiração do cache (por exemplo, 1 hora)
      res.status(200).send(ocorrencia);
    }
  }).catch((error) => {
    console.error('Erro ao buscar dados no Redis:', error);
    res.status(500).send({ error: 'Erro interno do servidor ao buscar dados no Redis' });
  })
}