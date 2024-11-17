

const InputLabel = ({ labelText, inputId, inputValue, setInputValue, requerido }) => {

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <label htmlFor={inputId}>{labelText}</label>
      {requerido && 
        (<input
          type="text"
          id={inputId}
          value={inputValue || ''}
          onChange={handleInputChange}
          required
        />)
      }
      {!requerido && 
        (<input
          type="text"
          id={inputId}
          value={inputValue || ''}
          onChange={handleInputChange}
        />)
      }
    </>
  );
};

export default InputLabel;