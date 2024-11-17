import InputSelect from "../elements/InputSelect"

const FormClienteNatural = ({ user, users, setElement }) => {
    return (
        <>
            <h2>Datos Cliente</h2>
                
                <label>
                    DNI:
                </label>
                    <InputSelect
                        setElement={setElement}
                        elements={users.map(user => ({ label: user.dni, value: user.dni }))}
                    />
                <label>
                    Apellido Paterno:
                </label>
                    <input type="text" value={user ? user.apellido || '' : ''} readOnly />
                <label>
                    Nombre:
                </label>
                    <input type="text" value={user ? user.nombre || '' : ''} readOnly />
                <label>
                    Departamento:
                </label>
                    <input type="text" value={user ? user.departamento || '' : ''} readOnly />        
                <label>
                    Distrito:
                </label>
                    <input type="text" value={user ? user.distrito || '' : ''} readOnly />        
        </>
    )
}

export default FormClienteNatural