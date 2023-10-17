const ocorrenciaRouter = require("./backend/routes/Ocorrencia.routes")
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use("/ocorrencias", ocorrenciaRouter)

app.get('/', async function (req, res){
    res.status(200).send('Deu certo!');
});

app.listen(3000);