const Ocorrencia = require('../model/Ocorrencia');

module.exports.listarOcorrencia = async function (req, res){
  const ocorrencias = await Ocorrencia.find({});
  res.status(200).send(ocorrencias);
};

module.exports.salvarOcorrencia = async function (req, res){
  const ocorrencia = await Ocorrencia.create(req.body);
  res.status(201).send(ocorrencia);
};

module.exports.deletarOcorrencia = async function (req, res){
  const ocorrencia = await Ocorrencia.findByIdAndDelete(req.params.id);
  if (!ocorrencia) {
    res.status(404).send({error: "Ocorrencia não encontrada"});
    return;
  }
  await ocorrencia.findByIdAndDelete(req.params.id);
  res.status(200).send({message: "Ocorrencia deletada com sucesso"});
};

module.exports.atualizarOcorrencia = async function (req, res){
  const ocorrencia = await Ocorrencia.findById(req.params.id);
  if (!ocorrencia) {
    res.status(404).send({error: "Ocorrencia não encontrada"});
    return;
  }
  const retorno = await ocorrencia.findByIdAndUpdate(
    req.params.id, req.body, {new: true});
  res.status(200).send(retorno);
}