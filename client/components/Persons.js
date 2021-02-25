import React from 'react';
import Person from './Person';

const Persons = ({persons, handleDelete}) => 
{
    return (
        <div>
           { persons.map( p => 
                <Person 
                    key={p.id}
                    person={p} 
                    handleDelete={handleDelete} /> ) } 
        </div>
    );
}

export default Persons;