const express = require('express');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb+srv://leanfj:leanfj@cluster0-ipytm.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json())

//Query params: req.query - (Filtros, ordenação, paginação)
//Route params: req.params - (Identificar um recurso para alteração ou remoção)
//Body: req.body - ()

app.get('/', (req, res, next) => {
    console.log(req.query);
    return res.json({version: "1.0.0"});
});


app.delete('/user/:id', (req, res, next) => {
    console.log(req.params);
});

app.post('/user', (req, res, next) => {
    console.log(req.body);
})

app.listen(3333);