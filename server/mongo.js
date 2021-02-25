const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5)
{
    console.log('wrong number of parameters, use either of two:');
    console.log('node mongo.js <password>');
    console.log('node mongo.js <password> <name> <number>');
    process.exit(1);
}

const password = process.argv[2];
const database = 'phonebook';

const url =
    `mongodb+srv://fullstack:${password}@cluster0.eyrdp.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() =>
    {
        console.log('MongoDB connected');
    })
    .catch(error =>
    {
        console.log('MongoDB connection unsuccesfull, error:', error);
    });

const personSchema = new mongoose.Schema(
    {
        name: String,
        number: String
    });

const Person = mongoose.model('Person', personSchema);

const add = process.argv.length === 5;

if (add)
{
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person(
        {
            name: name,
            number: number
        }
    );
    person.save().then(result =>
    {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });
}
else
{
    Person.find({}).then(result =>
    {
        console.log('phonebook:');
        result.forEach(p =>
        {
            console.log(`${p.name} ${p.number}`);
        });
        mongoose.connection.close();
    });
}

