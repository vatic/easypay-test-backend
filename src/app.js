const express = require('express');
const logger = require('winston');
const phonesRouter = require('./routes/phones');

const app = express();

app.get('/', (req, res) => {
  return res.json({ msg: 'Hello World!' });
});

app.use('/phones', phonesRouter);

app.listen(3000, () => {
  logger.info('Easypay test app listening on port 3000!');
});
