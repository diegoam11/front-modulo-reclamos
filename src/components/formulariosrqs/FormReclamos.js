import InputReadOnly from "../editarrqs/InputReadOnly";
import InputDate from "../elements/InputDate";
import InputLabelInt from "../elements/InputLabelInt";
import InputSelectNull from '../elements/InputSelectNull';
import InputSelect from '../elements/InputSelect';
import areaPorIdReclamo from "../funtions/areaPorIdReclamo";
import { useEffect, useState } from "react";
import codigoVenta from "../funtions/codigoVenta";
import { format, sub } from 'date-fns';

import apiventas from '../../api/apiventas'

const FormReclamo = ({
    user, tipoRecl, setTipoRecl, fechaRecl, setFechaRecl, formaRespRecl, setFormaRespRecl, tipoBienContratadoRecl, setTipoBienContratadoRecl, fechaCompraRecl, setFechaCompraRecl, numeroPedidoRec, setNumeroPedidoRec, codigoProductoRec, setCodigoProductoRec, detalleRecl, setdetalleRecl, montoRecl, setMontoRecl, peticionClienteRecl, setPeticionClienteRecl
}) => {

  const [cliente, setCliente] = useState()
  const [ventas, setVentas] = useState(null)
  const [detalles, setDetalles] = useState(null)
  const [venta, setVenta] = useState()

  const fetchVentas = async () => {
    try {
      const response = await apiventas.get(`/getselldni/${cliente.dni}`);// Llamar API
      // console.log(response.data)
      setVentas(response.data)
      
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  const fetchDetalles = async () => {
    try {
      const response = await apiventas.get(`/getselldetails/${venta.id_venta}`);// Llamar API
      // console.log(response.data)
      setDetalles(response.data)
      
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  useEffect(() => {
    if(user!== null){
      if (user.dni !== undefined && user && typeof user === 'object' && Object.keys(user).length !== 0 && user.dni !== "") {
        // console.log("Usuario existe", user.dni);
        setCliente(user)
      }
    }
  }, [user]);
  
  useEffect(() => {
    if(user!==null){
      if (user.dni !== undefined && user && typeof user === 'object' && Object.keys(user).length !== 0 && user.dni !== "") {
        fetchVentas()
      }
    }
  }, [cliente]);


    useEffect(() => {
      if(venta && Object.keys(venta).length !== 0 && venta.fecha !== undefined){

        const fechaOriginal = new Date(venta.fecha);
        const fechaRestada = sub(fechaOriginal, { days: 1 });
        const fechaFormateada = format(fechaRestada, 'yyyy-MM-dd');
        setFechaCompraRecl(fechaFormateada);
          //console.log(fechaFormateada)

        setNumeroPedidoRec(codigoVenta(2))
        fetchDetalles()
        //setFechaSolic
      } else {
        setNumeroPedidoRec(0)
        setFechaCompraRecl(null)
      }
      // console.log("Venta seleccionada",venta)
    }, [venta]);

    return (
        <>
            <div>
                <h2>Reclamo</h2>
            </div>
            <div>
            <label htmlFor="tipRecl">
                Tipo Reclamo:
            </label>
            <InputSelect
                    setElement={setTipoRecl}
                    elements={ 
                        [{ label: 'Otros', value: 1 },//3
                        { label: 'Producto Errado y/o Caracteristicas Distintas', value: 2 },//3
                        { label: 'Producto con falla de funcionamiento', value: 3 },//4
                        { label: 'Producto no estregado o con retraso', value: 4 },  //2
                        { label: 'Error precio', value: 5 },  //2
                        { label: 'Producto con daño Fisico', value: 6 },  //4
                        { label: 'Producto incompleto', value: 7 },  //3
                        { label: 'Incumplimiento de Promocion', value: 8 },//2
                        { label: 'Publicidad engañosa', value: 9 },  //5
                        { label: 'Problemas de facturación', value: 10 },  //3
                        { label: 'Falta de Transparencia en políticas del cliente', value: 11 }]//1
                    }
            />
            </div>
            <div>
                <InputReadOnly
                    titulo={"Area Responsable"} 
                    dato={tipoRecl? areaPorIdReclamo(tipoRecl): ""}
                />
            </div>            
            <div>
                <InputReadOnly
                    titulo={"Fecha Queja"} 
                    dato={fechaRecl}
                />
            </div>
            <div>
            <label htmlFor="catRec">
                Forma de Respuesta:
            </label>
            <InputSelect
                    setElement={setFormaRespRecl}
                    elements={ 
                        [{ label: 'Correo', value: 'correo' },
                        { label: 'Carta', value: 'carta' },
                        { label: 'Presencial', value: 'presencial' }]   
                    }
                    />            
            </div>
            <div>
            <label htmlFor="catRec">
                Tipo de Bien Contratado:
            </label>
            <InputSelect
                    setElement={setTipoBienContratadoRecl}
                    elements={ 
                        [{ label: 'Producto', value: 1 },
                        { label: 'Servicio', value: 2 }]   
                    }
                    />            
            </div>
            <div>
              <label htmlFor="numeroPedidoVenta">
                  Numero de Pedido:
              </label>
              <InputSelectNull
                  setElement={setVenta}
                  elements={ventas? ventas.map((venta) => ({ label: venta.id_venta, value: venta })):
                  [{ label: 'No hay ventas realizadas', value: 1 }] 
                  }
              />           
            </div>         
            <div>
                <InputDate
                    labelText="Fecha de Compra"
                    inputId="fechaCompraRecl"
                    inputValue={fechaCompraRecl}
                    setInputValue={setFechaCompraRecl}
                />
            </div>
            {detalles!== null? 
            <>
                {detalles!== null? 
                <>
                    <InputReadOnly
                        titulo={"Detalle de Venta:"} 
                        dato={detalles.map(detalle => `${detalle.tipo}, ${detalle.coste_total}`).join("; ")}
                    />
                </>:
                <>
                </>}  
            </>:
            <>
            </>}          
            <div>
                <InputLabelInt
                    labelText={"Codigo de Producto:"}
                    inputId={"codProd"}
                    inputValue={codigoProductoRec}
                    setInputValue={setCodigoProductoRec}
                    requerido={true}
                />
            </div>
            <div>
                <label htmlFor='detalleRecl'>
                Detalle Reclamado:
                </label>
                <textarea
                id='detalleRecl'
                type="text"
                value={detalleRecl}
                onChange={(e) => setdetalleRecl(e.target.value)}
                required
                />
            </div>  
            <div>
                <InputLabelInt
                    labelText={"Monto Reclamado:"}
                    inputId={"montoRecl"}
                    inputValue={montoRecl}
                    setInputValue={setMontoRecl}
                    requerido={true}
                />
            </div>
            <div>
                <label htmlFor='peticionRecl'>
                Peticion del Cliente:
                </label>
                <textarea
                id='peticionRecl'
                type="text"
                value={peticionClienteRecl}
                onChange={(e) => setPeticionClienteRecl(e.target.value)}
                required
                />
            </div>   

{/*                          
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
        </div> */}
        </>
    )
}

export default FormReclamo