const express = require('express');
const app = express();
app.use(express.json());

app.get('/', async function (req, res){
    res.status(200).send('Deu certo!');
});

app.listen(3000);