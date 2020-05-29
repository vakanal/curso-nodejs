const { countries, languages } = require('countries-list');

const routes = app => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/info', (req, res) => {
    res.send('Info Nodemon');
  });

  app.get('/country', (req, res) => {
    res.json(countries[req.query.code]);
  });

  app.get('/languages/:lang', (req, res) => {
    const lang = languages[req.params.lang];
    if (lang) {
      res.json(lang);
    } else {
      res.status(404).json({ status: 'NOT FOUND' });
    }
  });

  app.get('*', (req, res) => {
    res.status(404).send('Not found!');
  });
};

module.exports = routes;
