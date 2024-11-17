import Select from 'react-select';


export const InputSelect = ({ elements,  setElement}) => {

    const handleSelectChange = ( selectedOption ) => {
        setElement(selectedOption.value);
    }

    return (
        <div className = " InputSelect-container ">
            <Select
                options={elements}
                onChange={handleSelectChange}
                required
            />
        </div>
    )
}

export default InputSelect;