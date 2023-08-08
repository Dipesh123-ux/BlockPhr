import React, { useState } from 'react';
import {Allergies} from './data/Allergies'

const AllergySelector = () => {
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const toggleAllergy = (allergy) => {
    if (selectedAllergies.some(selectedAllergy => selectedAllergy.id === allergy.id)) {
      setSelectedAllergies(selectedAllergies.filter(selectedAllergy => selectedAllergy.id !== allergy.id));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Allergies.map(allergy => (
        <button
          key={allergy.id}
          onClick={() => toggleAllergy(allergy)}
          className={`py-2 px-4 border ${selectedAllergies.includes(allergy) ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500'} rounded-full hover:bg-blue-500 hover:text-white focus:outline-none transition-colors duration-300`}
          title={allergy.description}
        >
          {allergy.name}
        </button>
      ))}
    </div>
  );
};

export default AllergySelector;
