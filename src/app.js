const express = require('express');
const cors = require('cors')

const logger = require('winston');
const bodyParser = require('body-parser');
const { restrictedPhoneRouter, checkPhoneRouter } = require('./routes/phones');
const OAuthServer = require('oauth2-server');
const oauthModel = require('./models/oauth');


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.oauth = new OAuthServer({
  model: oauthModel,
  grants: ['password'],
  debug: true,
});

app.all('/login', app.oauth.grant());

// app.get('/', app.oauth.authorise(), function (req, res) {
//   res.send('Secret area');
// });

app.use(app.oauth.errorHandler());
// app.use(app.oauth.authorize());

// app.post('/login', app.oauth.token());
// app.get('/', (req, res) => res.json({ msg: 'Hello World!' }));

app.use('/phones/check', checkPhoneRouter);
app.use('/phones', app.oauth.authorise(), restrictedPhoneRouter);

app.listen(8080, () => {
  logger.info('Easypay test app listening on port 8080!');
});

module.exports = app;
