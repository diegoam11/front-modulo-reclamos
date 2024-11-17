import React from 'react'
import Select from 'react-select';

const InputSelectDefault = ({ elements, setElement, defaultValue }) => {
    const handleSelectChange = (selectedOption) => {
        setElement(selectedOption.value);
      };
    
      return (
        <div className="InputSelect-container">
          <Select
            options={elements}
            onChange={handleSelectChange}
            required
            defaultValue={defaultValue} // Agregar defaultValue aquí
          />
        </div>
      );
}

export default InputSelectDefault