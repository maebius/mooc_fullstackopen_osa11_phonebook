import React from 'react';

const FilterForm = ({ filter, filterChange }) => (
  <div>
    filter shown with
    <input value={filter} onChange={filterChange} />
  </div>
);

export default FilterForm;
