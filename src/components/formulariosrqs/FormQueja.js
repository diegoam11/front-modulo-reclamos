import InputDate from "../elements/InputDate";
import InputLabel from "../elements/InputLabel"
import InputLabelInt from "../elements/InputLabelInt";
import InputSelectNull from '../elements/InputSelectNull';
import InputSelect from '../elements/InputSelect';
import InputReadOnly from "../editarrqs/InputReadOnly";
import { useEffect, useState } from "react";
import codigoVenta from "../funtions/codigoVenta";
import { format, sub } from 'date-fns';


import apiventas from '../../api/apiventas'


const FormQueja = ({
    user, fechaQuej, setFormaRespQuej, setTipoBienContratadoQuej, fechaCompraQuej, setFechaCompraQuej, numeroPedidoQuej, setNumeroPedidoQuej, codigoProductoQuej, setCodigoProductoQuej, detalleQuej, setDetalleQuej, peticionClienteQuej, setPeticionClienteQuej
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
          setFechaCompraQuej(fechaFormateada);
            //console.log(fechaFormateada)
  
          setNumeroPedidoQuej(codigoVenta(0))
          fetchDetalles()
          //setFechaSolic
        } else {
          setNumeroPedidoQuej(0)
          setFechaCompraQuej(null)
        }
        // console.log("Venta seleccionada",venta)
      }, [venta]);

    return (
        <>
            <h2>Queja</h2>
            <div>
                <InputReadOnly 
                    titulo={"Fecha Queja"} 
                    dato={fechaQuej} 
                />
            </div>
            <div>
            <label htmlFor="catQuej">
                Forma de Respuesta:
            </label>
            <InputSelect
                    setElement={setFormaRespQuej}
                    elements={ 
                        [{ label: 'Correo', value: 'correo' },
                        { label: 'Carta', value: 'carta' },
                        { label: 'Presencial', value: 'presencial' }]   
                    }
                    />            
            </div>            
            <div>
            <label htmlFor="catQuej">
                Tipo de Bien Contratado:
            </label>
            <InputSelect
                    setElement={setTipoBienContratadoQuej}
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
                    inputId="fechaCompraQuej"
                    inputValue={fechaCompraQuej}
                    setInputValue={setFechaCompraQuej}
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
                    inputValue={codigoProductoQuej}
                    setInputValue={setCodigoProductoQuej}
                    requerido={true}
                />
            </div>
            <div>
                <label htmlFor='detalleQuej'>
                Detalle Queja:
                </label>
                <textarea
                id='detalleQuej'
                type="text"
                value={detalleQuej || ''}
                onChange={(e) => setDetalleQuej(e.target.value)}
                required
                />
            </div>              
            <div>
                <label htmlFor='peticionQuej'>
                Peticion del Cliente:
                </label>
                <textarea
                id='peticionQuej'
                type="text"
                value={peticionClienteQuej || ''}
                onChange={(e) => setPeticionClienteQuej(e.target.value)}
                required
                />
            </div>            
        </>
    )
}

export default FormQueja