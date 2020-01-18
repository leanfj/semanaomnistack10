const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(
  'mongodb+srv://leanfj:leanfj@cluster0-ipytm.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());

//Query params: req.query - (Filtros, ordenação, paginação)
//Route params: req.params - (Identificar um recurso para alteração ou remoção)
//Body: req.body - ()
app.use(routes);

server.listen(3333);
