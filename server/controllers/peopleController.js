const Person = require('../models/person');

const getPerson = async (req, res, next) => {
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  }).catch((error) => next(error));
};

const destroy = async (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
};

const update = async (req, res, next) => {
  const { body } = req;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updated) => {
      res.json(updated.toJSON());
    })
    .catch((error) => next(error));
};


const create = async (req, res, next) => {
  const { body } = req;
  console.log(body);

  const person = new Person(
    {
      name: body.name,
      number: body.number,
    },
  );
  person.save()
    .then((result) => res.json(result.toJSON()))
    .catch((error) => next(error));
};

const getAll = async (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
};

const getInfo = async (req, res) => {
  Person.countDocuments({}).then((count) => {
    const now = new Date();
    const result = '<br/>'
            + `Phonebook has info for ${count} people`
            + '<br/><br/>'
            + `${now.toString()}`;

    res.send(result);
  });
};


module.exports = {
  getPerson,
  destroy,
  update,
  create,
  getAll,
  getInfo,
};
