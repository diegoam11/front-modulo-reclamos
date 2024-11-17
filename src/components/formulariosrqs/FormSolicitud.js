import InputDate from "../elements/InputDate";
import InputLabel from "../elements/InputLabel"
import InputLabelInt from "../elements/InputLabelInt";
import InputSelectNull from '../elements/InputSelectNull';
import InputSelect from "../elements/InputSelect";
import InputReadOnly from "../editarrqs/InputReadOnly";
import areaPorIdSolicitud from "../funtions/areaPorIdSolicitud";
import { useEffect, useState } from "react";
import codigoVenta from "../funtions/codigoVenta";

import apiventas from '../../api/apiventas'

const FormSolicitud = ({
    user, estadoSolic,setEstadoSolic,tipoSolic,setTipoSolic,fechaSolic,setFechaSolic,formaRespSolic,setFormaRespSolic,tipoBienContratadoSolic,setTipoBienContratadoSolic,numeroPedidoSolic,setNumeroPedidoSolic,codigoProductoSolic,setCodigoProductoSolic,detalleSolic,setDetalleSolic,peticionClienteSolic,setPeticionClienteSolic
}) => {

  const [cliente, setCliente] = useState()
  const [ventas, setVentas] = useState(null)
  const [venta, setVenta] = useState()

  const fetchVentas = async () => {
    try {
      const response = await apiventas.get(`/getselldni/${cliente.dni}`);// Llamar API
      //console.log(response.data)
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
    if(venta !== null){
      setNumeroPedidoSolic(codigoVenta(2))
      //setFechaSolic
    } else {
      setNumeroPedidoSolic(0)
    }
  }, [venta]);
    
    return (
        <>
            <h2>Solicitud</h2>
            <div>
            <label htmlFor="catSolic">
                Tipo Solicitud:
            </label>
            <InputSelect
                setElement={setTipoSolic}
                elements={ 
                    [{ label: 'Otros', value: 9 },//3
                    { label: 'Cambio de Plan', value: 1 },//3
                    { label: 'Cancelacion de Servicio', value: 2 },//4
                    { label: 'Nuestro Servicio', value: 3 },  //2
                    { label: 'Soporte Tecnico', value: 4 },  //2
                    { label: 'Cambio de informacion personal', value: 5 },  //4
                    { label: 'Descuentos y promociones', value: 6 },  //3
                    { label: 'Informacion o consulta', value: 7 },//2
                    { label: 'Cambio de metodo de pago', value: 8 }]//3
                }
            />        
            </div>            
            <div>
                <InputReadOnly 
                    titulo={"Area Responsable"} 
                    dato={tipoSolic? areaPorIdSolicitud(tipoSolic): ""}
                />
            </div>
            <div>
                <InputReadOnly 
                    titulo={"Fecha Solicitud"} 
                    dato={fechaSolic} 
                />
            </div>
            <div>
            <label htmlFor="formaRptaSolic">
                Forma de Respuesta:
            </label>
            <InputSelect
                    setElement={setFormaRespSolic}
                    elements={ 
                        [{ label: 'Correo', value: 'correo' },
                        { label: 'Carta', value: 'carta' },
                        { label: 'Presencial', value: 'presencial' }]   
                    }
                    />            
            </div>            
            <div>
            <label htmlFor="tipoBienContratadoSolic">
                Tipo de Bien Contratado:
            </label>
            <InputSelect
                    setElement={setTipoBienContratadoSolic}
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
                elements={ventas? ventas.map((venta, idx) => ({ label: venta.id_venta, value: idx })):
                [{ label: 'No hay ventas realizadas', value: 1 }] 
                }
            />           
            </div>
            <div>
                <InputLabelInt
                    labelText={"Codigo de Producto:"}
                    inputId={"codProd"}
                    inputValue={codigoProductoSolic}
                    setInputValue={setCodigoProductoSolic}
                    requerido={true}
                />
            </div>
            <div>
                <label htmlFor='detalleSolic'>
                Detalle Solicitud:
                </label>
                <textarea
                id='detalleSolic'
                type="text"
                value={detalleSolic || ''}
                onChange={(e) => setDetalleSolic(e.target.value)}
                required
                />
            </div>              
            <div>
                <label htmlFor='peticionSolic'>
                Peticion del Cliente:
                </label>
                <textarea
                id='peticionSolic'
                type="text"
                value={peticionClienteSolic || ''}
                onChange={(e) => setPeticionClienteSolic(e.target.value)}
                required
                />
            </div>            
        </>
    )
}

export default FormSolicitud