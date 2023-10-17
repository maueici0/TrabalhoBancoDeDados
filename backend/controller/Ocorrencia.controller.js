const Ocorrencia = require("../model/Ocorrencia")
module.exports.salvarOcorrencia = async function (req, res){
    const titulo = req.body.titulo;
    const tipo = req.body.tipo;
    const data = new Date(req.body.data);
    const hora = req.body.hora;
    const longitude = req.body.localizacao[0];
    const latitude = req.body.localizacao[1];
    try{
      await Ocorrencia.create({
        titulo: titulo,
        tipo: tipo,
        data: data,
        hora: hora,
        localizacao: {type:"Point", 
                      coordinates:[longitude,latitude]
                      }       
      });
      res.status(201).send('Salvo');
    }catch{
      res.status(400).send('Falha ao salvar');
    };
  };
module.exports.listarOcorrencia = async function(req, res){
  const listaOcorrencias = await Ocorrencia.findAll();
  res.send(listaOcorrencias)
}