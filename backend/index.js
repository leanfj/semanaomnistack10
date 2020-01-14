const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    return res.json({version: "1.0.0"})
});

app.listen(3333);