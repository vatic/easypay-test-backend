const express = require('express');
const logger = require('winston');
const bodyParser = require('body-parser');
const phonesRouter = require('./routes/phones');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.json({ msg: 'Hello World!' });
});

app.use('/phones', phonesRouter);

app.listen(3000, () => {
  logger.info('Easypay test app listening on port 3000!');
});
