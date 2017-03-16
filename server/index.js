'use strict';
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static('dist'));

app.listen(port, function() {
    console.log('app started on port ' + port);
})
