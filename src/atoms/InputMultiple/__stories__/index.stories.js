import React, { useState } from 'react';
import InputMultiple from '../index';

export default { title: 'Atoms/Legacy/Input Multiple' };

function InputMultipleComponent() {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = domains => {
    setSelectedValues(domains);
  };

  return (
    <section className="SearchOverview__componentSection">
      <InputMultiple name="input" value={selectedValues} onChange={handleChange} />
    </section>
  );
}

export const Overview = () => <InputMultipleComponent />;
