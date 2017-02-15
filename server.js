const express = require('express');

const app = express();
const portn = process.env.PORT || 5000;

app.get('/api/whoami', (req, res) => {
  let ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let language = req.headers['accept-language'].slice(0, 5);
  let software = req.headers['user-agent'].match(/\(([^\)]+)\)/)[1];

  res.end(JSON.stringify({
    ipaddress,
    language,
    software
  }));
});

app.get('/*', (req, res) => {
  res.redirect('/api/whoami/');
});

app.listen(portn, () => {
  console.log(`Listening on port ${portn}...`);
});