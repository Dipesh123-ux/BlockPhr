import React, { useState } from 'react';

const MedicineTracker = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddMedicine = () => {
    if (medicineName && quantity !== '') {
      const newMedicine = { name: medicineName, quantity: parseInt(quantity) };
      setMedicines([...medicines, newMedicine]);
      setMedicineName('');
      setQuantity('');
    }
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Medicine name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantity (mg)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleAddMedicine} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      {medicines.map((medicine, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <button className="border p-2 rounded">{`${medicine.name} (${medicine.quantity} mg)`}</button>
          <button onClick={() => handleRemoveMedicine(index)} className="bg-red-500 text-white px-2 py-1 rounded">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default MedicineTracker;
