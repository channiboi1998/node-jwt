require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// middleware
app.use(express.static('./public'));
app.use(express.json());


const port = process.env.PORT || 3000;

// routes
app.use('/api/v1/', require('./routes/main'));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {   
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
