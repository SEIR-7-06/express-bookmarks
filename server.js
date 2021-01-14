const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');

const app = express();
const PORT = process.env.PORT || 4000;

// Set EJS as the View Engine
app.set('view engine', 'ejs');

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));

// Home Route
app.get('/', (req, res) => {
  const context = {
    meta: {
      title: 'Welcome to Express Bookmars'
    }
  };

  res.render('index', context);
});

app.use('/users', usersController);

// Server Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
