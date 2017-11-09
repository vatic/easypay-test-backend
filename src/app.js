const express = require('express');
const logger = require('winston');

const app = express();

app.get('/', (req, res) => {
  return res.json({ msg: 'Hello World!' });
});

app.listen(3000, () => {
  logger.info('Example app listening on port 3000!');
});
