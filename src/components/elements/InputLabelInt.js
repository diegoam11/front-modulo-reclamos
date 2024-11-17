import React from 'react';

const InputLabelInt = ({ labelText, inputId, inputValue, setInputValue, requerido }) => {
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    // Validar si el texto ingresado es un número
    const numericValue = inputText.replace(/[^0-9]/g, '');
    setInputValue(numericValue);
  };

  return (
    <div>
      <label htmlFor={inputId}>{labelText}</label>
      <input
        type="text"
        id={inputId}
        value={inputValue || ""}
        onChange={handleInputChange}
        required={requerido}
      />
    </div>
  );
};

export default InputLabelInt;
