import React from 'react';
import Person from 'Components/Person';

const Persons = ({ persons, handleDelete }) => (
  <div>
    { persons.map((p) => (
      <Person
        key={p.id}
        person={p}
        handleDelete={handleDelete}
      />
    )) }
  </div>
);

export default Persons;
