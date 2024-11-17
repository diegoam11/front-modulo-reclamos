import React from 'react'
import InputSelect from '../elements/InputSelect'

const FormDatosComunes = ({
    fechaRegistro, areaResponsable, setAreaResponsable, descripcionRqs, setDescripcionRqs}
) => {
    return (
    <>
        <div>
        <label htmlFor="fechaRegistro">
            Fecha Registro:
        </label>
        <input
        type="text"
        id="fechaRegistro"
        value={fechaRegistro}
        required
        readOnly 
        />

        </div>
        <div>
            <label htmlFor='descripcion'>
            Descripción:
            </label>
            <textarea
            id='descripcion'
            type="text"
            value={descripcionRqs}
            onChange={(e) => setDescripcionRqs(e.target.value)}
            required
            />
        </div>
        <div>
            <label htmlFor='areaResponsable'>
            Area Responsable:
            </label>
            <InputSelect
                setElement={setAreaResponsable}
                elements={ 
                    [{ label: 'Ventas', value: 'Ventas' },
                    { label: 'Clientes', value: 'Clientes' },
                    { label: 'Reparaciones', value: 'Reparaciones' }]   
                }
            />
        </div>
    </>
  )
}

export default FormDatosComunes