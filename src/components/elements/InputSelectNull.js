import React from 'react';
import Select from 'react-select';

export const InputSelectNull = ({ elements, selectedElement, setElement }) => {
  const options = [
    { label: 'Seleccionar...', value: null }, // Opción para deshacer la elección
    ...elements,
  ];

  const handleSelectChange = (selectedOption) => {
    setElement(selectedOption ? selectedOption.value : null);
  };

  return (
    <div className="InputSelect-container">
      <Select
        options={options}
        value={options.find((option) => option.value === selectedElement)}
        onChange={handleSelectChange}
        required
      />
    </div>
  );
};

export default InputSelectNull;
