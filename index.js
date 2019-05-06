const express = require('express');

const app = express();

// restrict app by subdomain
app.use(function(req, res, next) {
  if (process.env.NODE_ENV !== 'development') {
    if (!req.subdomains.includes('mycooldomain')) {
      return res.sendStatus(403);
    }
  }
  next();
});

// restrict app by method
// e.g. read only API
app.use(function(req, res, next) {
  if (req.method !== 'GET') {
    return res.sendStatus(405);
  }
  next();
});

app.use(express.json());

app.get('/api/secret', (req, res) => {
  res.status(200).send('Super Secret Data');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
