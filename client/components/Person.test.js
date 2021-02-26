import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Person from './Person'

describe('Person', () => 
{
    test("Person has name and number", () => 
    {
        const handleDelete = jest.fn();
        const person = { name: "kekkonen", number: "salainen" };
        
        let component = render(
          <Person person={person} handleDelete={handleDelete} />);

        expect(component.container).toHaveTextContent("kekkonen");
        expect(component.container).toHaveTextContent("salainen");
    });
});