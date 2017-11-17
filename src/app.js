const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const logger = require('winston');
const bodyParser = require('body-parser');
const { restrictedPhoneRouter, checkPhoneRouter } = require('./routes/phones');
const OAuthServer = require('oauth2-server');
const oauthModel = require('./models/oauth');


const app = express();
app.use(morgan('combined'));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.oauth = new OAuthServer({
  model: oauthModel,
  grants: ['password'],
  debug: true,
  passthroughErrors: true,
  accessTokenLifetime: 86400,
});

app.all('/login', app.oauth.grant());

// app.get('/', app.oauth.authorise(), function (req, res) {
//   res.send('Secret area');
// });

app.use(app.oauth.errorHandler());

app.use('/phones/check', checkPhoneRouter);
app.use('/phones', app.oauth.authorise(), restrictedPhoneRouter);

app.listen(8080, () => {
  logger.info('Easypay test app listening on port 8080!');
});

module.exports = app;
