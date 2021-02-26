const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('@util/routes');
const errorMiddleware = require('@middleware/errorMiddleware');

const app = express();

app.use(express.json());

app.use(cors());
morgan.token('body',
  (req) => JSON.stringify(req.body));
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body',
));

app.use(routes);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.use(errorMiddleware);

module.exports = app;
