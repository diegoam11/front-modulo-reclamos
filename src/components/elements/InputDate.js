import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputDate = ({ labelText, inputId, inputValue, setInputValue }) => {
  const handleDateChange = (date) => {
    // Formatear la fecha a 'yyyy-MM-dd'
    if(date !== null){
      const formattedDate = date.toISOString().split('T')[0];
      setInputValue(formattedDate);
      console.log(formattedDate)
    } else {
      setInputValue(null);
    }
  };

  return (
    <div>
      <label htmlFor={inputId}>{labelText}</label>
      <DatePicker
        id={inputId}
        selected={inputValue ? new Date(inputValue) : null}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Seleccionar fecha"
        showYearDropdown
        scrollableYearDropdown
        required
      />
    </div>
  );
};

export default InputDate;
