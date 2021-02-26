const errorHandler = (error, req, res, next) => {
  console.error(error.message, error.name, error.extra);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformed id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === 'ApplicationError') {
    return res.status(error.status).send({ error: error.message });
  }

  res.status(500).send({ error: error.message });
  return next(error);
};

module.exports = errorHandler;
