const logger = require('morgan');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

require('./routes/staticRoutes.js')(app);
require('./routes/apiRoutes.js')(app);

app.listen(PORT, e => console.log("running"));