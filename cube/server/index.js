const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(cors());

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

require('dotenv').config();
require('./db.js')(app);
require('./matches.js')(app);
require('./healthcheck.js')(app);
require('./bot.js')(app);