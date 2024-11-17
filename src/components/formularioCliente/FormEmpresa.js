

const FormEmpresa = ({ clienteEmpresaNombre, setClienteEmpresaNombre }) => {
    const handleInputChange = (event) => {
        setClienteEmpresaNombre(event.target.value);
    };
    
    return (
        <>
            <h2>Cliente Empresa</h2>
            <label htmlFor="clienteNombre">Cliente Nombre</label>
            <input
                type="text"
                id="clienteNombre"
                value={clienteEmpresaNombre}
                onChange={handleInputChange}
                required
            />
                    
        </>
    )
}

export default FormEmpresa