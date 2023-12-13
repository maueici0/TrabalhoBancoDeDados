# PoliceIncidentAPI

Este projeto foi desenvolvido para as atividades avaliativas da disciplina de Banco de Dados 2. O projeto tem como objetivo pôr em prática os conhecimentos acerca de bancos de dados espaciais. Visando abordar um tema prático, desenvolvemos uma API para registrar dados de ocorrências policiais. Abaixo, você encontrará detalhes sobre o desenvolvimento do projeto e um guia para executar o software.

## 🚀 - Habilidades Desenvolvidas

- Desenvolvimento de uma aplicação web;
- CRUD completo;
- Conexão com banco de dados;
- Utilização da API do Google Maps javascript;
- Técnica da Persistência Poliglota;
- Trabalho em equipe.

## 🛠 - Tecnologias Utilizadas

- HTML5;
- CSS3;
- JavaScript;
- Express.js;
- Mongoose;
- MongoDB/Atlas;
- Redis Cloud (Cache-Aside Strategy)

## 🔗 - Passo a Passo

1. Certifique-se de ter o Node.js instalado em seu computador. Caso não tenha, você pode baixá-lo [aqui](https://nodejs.org/pt-br/download).

2. Na pasta do repositório, utilize o comando npm install para instalar as dependências do projeto.

3. Certifique-se de ter uma conta no MongoDB Atlas. Se ainda não tiver, crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

4. No MongoDB Atlas, crie um novo cluster e siga as instruções para configurar o acesso ao seu banco de dados.

5. Certifique-se de ter uma instância do Redis em execução configurada para ser acessada.

6. Crie um arquivo .env na raiz do seu projeto e configure as variáveis de ambiente necessárias, como o URL de conexão com o banco de dados, o nome do banco de dados, o usuário e a senha. Exemplo:

        bash
        MONGO_URL = yourMongoDBConnectionUrl
        API_PORT= yourPort
        REDIS_HOST=yourRedisHost
        REDIS_PORT=yourRedisPort
        REDIS_PASSWORD=yourRedisPassword


6. Agora, inicie o servidor com o comando npm start.

7. Pronto, agora você pode testar a aplicação.

## 📞 - Contato

Este projeto foi desenvolvido pelos alunos:

- [Danrlei Lira](https://github.com/dxnrlei)
- [Maurício Bernardo](https://github.com/maueici0)

## 🙏 - Agradecimentos

Gostaríamos de estender nossos sinceros agradecimentos ao Professor Paulo Freitas, conhecimento e apoio durante o desenvolvimento deste projeto como parte da disciplina de Banco de Dados 2.
Agradecemos também aos nossos colegas do Octeto da Gabi por nos aguentar tirando nossas dúvidas sempre que lhe pedíamos, não conseguiríamos sem vocês.💖