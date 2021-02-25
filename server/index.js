require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
morgan.token('body',
    function (req)
    {
        return JSON.stringify(req.body);
    });
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons/:id', (req, res, next) =>
{
    Person.findById(req.params.id).then(person =>
    {
        if (person)
        {
            res.json(person);
        }
        else
        {
            res.status(404).end();
        }
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) =>
{
    Person
        .findByIdAndRemove(req.params.id)
        .then(() =>
        {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) =>
{
    const body = req.body;

    const person =
    {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updated =>
        {
            res.json(updated.toJSON());
        })
        .catch(error => next(error));
});


app.post('/api/persons', (req, res, next) =>
{
    const body = req.body;
    console.log(body);

    const person = new Person(
        {
            name: body.name,
            number: body.number
        }
    );
    person.save()
        .then(result => res.json(result.toJSON()))
        .catch(error => next(error));
});

app.get('/api/persons', (req, res) =>
{
    Person.find({}).then(persons =>
    {
        res.json(persons);
    });
});

app.get('/info', (req, res) =>
{
    Person.countDocuments({}).then(count =>
    {
        let now = new Date();
        let result =
            '<br/>' +
            `Phonebook has info for ${count} people` +
            '<br/><br/>' +
            `${now.toString()}`;

        res.send(result);
    });
});

const unknownEndpoint = (req, res) =>
{
    res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) =>
{
    console.error(error.message);

    if (error.name === 'CastError')
    {
        return res.status(400).json({ error: 'malformed id' });
    }
    else if (error.name === 'ValidationError')
    {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`);
});