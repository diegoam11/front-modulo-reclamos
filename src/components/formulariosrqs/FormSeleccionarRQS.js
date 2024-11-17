import Button from "../elements/Button"

const FormSeleccionarRQS = ({ tipoFormulario, setTipoFormulario }) => {
    return (
        <div className="SelectForm">
            <div className="buttonContainer">
            <Button
                buttonText="Solicitud"            
                tipoFormulario={tipoFormulario}
                setTipoFormulario={setTipoFormulario}
            />
            </div>
            <div className="buttonContainer">
            <Button 
                buttonText="Reclamo"            
                tipoFormulario={tipoFormulario}
                setTipoFormulario={setTipoFormulario}
            />
            </div>
            <div className="buttonContainer">
            <Button 
                buttonText="Queja"
                tipoFormulario={tipoFormulario}
                setTipoFormulario={setTipoFormulario}
            />
            </div>
        </div>
    )
}

export default FormSeleccionarRQS