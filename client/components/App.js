import React, { useState, useEffect } from 'react';

import FilterForm from 'Components/FilterForm';
import AddPersonForm from 'Components/AddPersonForm';
import Persons from 'Components/Persons';
import personService from 'Utilities/services/personService';
import Notification from 'Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((p) => {
        setPersons(p);
      });
  }, []);

  const errorAlreadyDeleted = (person) => {
    setError(
      `Information of ${person.name} has`
            + ' already been removed from server.',
    );
    setTimeout(() => {
      setError(null);
    }, 5000);

    setPersons(persons.filter((p) => p.id !== person.id));
  };

  const addPerson = (event) => {
    event.preventDefault();

    const found = persons.find((p) => p.name === newName);
    if (found !== undefined) {
      const message = `${newName} is already added to phonebook, 
                replace the old number with a new one?`;

      if (window.confirm(message)) {
        const updated = { ...found, number: newNumber };
        personService.update(found.id, updated)
          .then((data) => {
            setMessage(
              `Changed number from ${found.name} to ${newNumber}`,
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);


            setPersons(persons.map(
              (p) => (p.id !== found.id ? p : data),
            ));
          })
          .catch((_response) => {
            setNewName('');
            setNewNumber('');
            errorAlreadyDeleted(found);
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((p) => {
        setPersons(persons.concat(p));
        setNewName('');
        setNewNumber('');

        setMessage(`Added ${p.name} to phonebook`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setError(`${error.response.data.error}`);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  const nameChange = (event) => {
    setNewName(event.target.value);
  };

  const numberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  const getFiltered = (filter) => {
    const personFilter = (person) => person.name.toLowerCase().startsWith(filter.toLowerCase());

    const filtered = filter.length > 0
      ? persons.filter((p) => personFilter(p))
      : persons;
    return filtered;
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
        .then((response) => {
          if (response.status === 204) {
            setPersons(persons.filter((p) => p.id !== person.id));

            setMessage(`Removed ${person.name} from phonebook`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          }
        })
        .catch((_response) => {
          errorAlreadyDeleted(person);
        });
    }
  };


  const filtered = getFiltered(filter);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} styleClass="message" />
      <Notification message={error} styleClass="error" />
      <FilterForm filter={filter} filterChange={filterChange} />

      <h2>add a new</h2>

      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        nameChange={nameChange}
        newNumber={newNumber}
        numberChange={numberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filtered} handleDelete={handleDelete} />

    </div>
  );
};

export default App;
