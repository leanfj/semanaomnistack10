const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes')

const app = express();

mongoose.connect('mongodb+srv://leanfj:leanfj@cluster0-ipytm.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json())

//Query params: req.query - (Filtros, ordenação, paginação)
//Route params: req.params - (Identificar um recurso para alteração ou remoção)
//Body: req.body - ()

app.use(routes);

app.listen(3333);