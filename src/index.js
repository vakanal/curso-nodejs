const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routesV1 = require('./routes/v1');

dotenv.config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Exito');
    app.listen(PORT, () => console.log(`Running on ${PORT}`));
  })
  .catch(error => {
    console.log(error);
  });
