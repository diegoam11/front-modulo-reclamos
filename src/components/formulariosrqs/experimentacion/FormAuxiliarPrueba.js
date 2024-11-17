import React from 'react'
import './formRQS.css'
import InputSelect from '../elements/InputSelect';
import InputLabel from "../elements/InputLabel"

const FormForm = ({idReclamoNuevo, handleSubmitReclamo, fechaRegistro, setFechaRegistro, areaResponsable, setAreaResponsable, descripcionRqs, setDescripcionRqs, idClienteNat, setIdClienteNat, idClienteJur, setIdClienteJur, idEmpleado, IdEmpleado, catRec, setCatRec, subcatRec, setSubcatRec, fechaResoluRec, setFechaResoluRec, fechaVenciRec, setFechaVenciRec, idServRec, setIdServRec, nombreServRec, setNombreServRec, idProducRec, setIdProducRec, nombreProducRec, setNombreProducRec, estadoRec, setEstadoRec, exigenciaRec, setExigenciaRec, prioridadRec, setPrioridadRec, accionesRec, setAccionesRec}) => {
  return (
    <main className="Form">
      <form onSubmit={handleSubmitReclamo}>

        <h2>Formulario</h2>
        {/* Seleccionar Registrar Informacion de una Persona Natural o Juridica */}
        
        {/* Seleccionar Registrar Reclamo Queja o Solicitud */}
        
        {/* Formulario de registro de Reclamo Queja o Solicitud */}
        <div>
                <h2>Reclamo</h2>
            </div>
            <div>
            <label htmlFor="catRec">
                Categoria Reclamo:
            </label>
            <InputSelect
                    setElement={setCatRec}
                    elements={ 
                        [{ label: 'Servicio Iternet Fijo', value: 'ServicioIternetFijo' },
                        { label: 'Plan de Datos Prepago', value: 'Plan deDatosPrepago' },
                        { label: 'Plan de Datos Postpago', value: 'Plan deDatosPostpago' },  
                        { label: 'Equipo Pregago', value: 'EquipoPregago' },  
                        { label: 'Equipo Postpago', value: 'EquipoPostpago' },  
                        { label: 'Facturacion', value: 'Facturacion' },  
                        { label: 'Garantia de Equipo', value: 'GarantiadeEquipo' }]   
                    }
            />
            </div>
            <div>
                <InputLabel
                    labelText={"Subategoria Reclamo"}
                    inputId={"subcategoriaRec"}
                    inputValue={subcatRec}
                    setInputValue={setSubcatRec}
                    requerido={true}
                />
            </div>
            <div>
                <InputLabel
                    labelText={"Fecha Vencimiento"}
                    inputId={"fechaVencimiento"}
                    inputValue={fechaVenciRec}
                    setInputValue={setFechaVenciRec}
                    requerido={true}
                />
            </div>
            <div>
                <InputLabel
                    labelText={"Id Servicio"}
                    inputId={"idServicio"}
                    inputValue={idServRec}
                    setInputValue={setIdServRec}
                    requerido={false}
                />
            </div>
            <div>
                <InputLabel
                    labelText={"Nombre de Servicio"}
                    inputId={"nombreServRec"}
                    inputValue={nombreServRec}
                    setInputValue={setNombreServRec}
                    requerido={false}
                />
            </div>
            <div>
                <InputLabel
                    labelText={"Id Producto"}
                    inputId={"idProducRec"}
                    inputValue={idProducRec}
                    setInputValue={setIdProducRec}
                    requerido={false}
                />
            </div>
            <div>
                <InputLabel
                    labelText={"Nombre de Producto"}
                    inputId={"nombreProducRec"}
                    inputValue={nombreProducRec}
                    setInputValue={setNombreProducRec}
                    requerido={false}
                />
            </div>
            <div>
            <label htmlFor="estadoRec">
                Estado de Reclamo:
            </label>
            <InputSelect
                    setElement={setEstadoRec}
                    elements={ 
                        [{ label: 'Derivado', value: 'Derivado' },
                        { label: 'Resuelto', value: 'Resuelto' }]  
                    }
            />
            </div>
            <div>
                <InputLabel
                    labelText={"exigenciaRec"}
                    inputId={"exigenciaRec"}
                    inputValue={exigenciaRec}
                    setInputValue={setExigenciaRec}
                    requerido={true}
                />
            </div>
            <div>
            <label htmlFor="prioridadRec">
                Prioridad de Reclamo:
            </label>
            <InputSelect
                    setElement={setPrioridadRec}
                    elements={ 
                        [{ label: 'Simple', value: 'Simple' },
                        { label: 'Normal', value: 'Normal' },
                        { label: 'Importante', value: 'Importante' }]  
                    }
            />
            </div>
            <div>
            <label htmlFor='accionesRec'>
            Acciones Reclamo:
            </label>
            <textarea
            id='accionesRec'
            type="text"
            value={accionesRec}
            onChange={(e) => setAccionesRec(e.target.value)}
            required
            />
        </div>

        {/* Campos comunes a un rqs */}
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

        <div>
          <button className='buttonSolicitud' type="submit">Enviar Solicitud</button>
        </div>
      </form>
    </main>
  )
}

export default FormForm