import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { format } from 'date-fns'
import api from '../../api/api'
import apiClientes from '../../api/clientes'
import InputReadOnly from './InputReadOnly';
import '../formulariosrqs/formRQS.css'
import Modal from '../elements/Modal';

const EditarReclamo = ({ 
    editAccionesTomadas, setEditAccionesTomadas, modalVisible, closeModal, processing, errorMessage, openModal, setProcessing, setErrorMessage
}) => {

    const { id } = useParams();
    const [usuario, setUsuario] = useState({})
    const [cliente, setCliente] = useState()
    const [reclamos, setReclamos] = useState(null)
    const [reclamo, setReclamo] = useState(null)
    const [fechaRespuesta, setFechaRespuesta] = useState("")

    const [error, setError] = useState(null)
    const history = useHistory()

    const handleEdit = async (e) => {
      e.preventDefault();
      setProcessing(true);
        const estadoNuevo = 1
        const updatedReclamo = {
            id: reclamo.id,
            id_cliente: reclamo.id_cliente,
            id_tipo_reclamo: reclamo.id_tipo_reclamo, 
            tipo_bien_contratado: reclamo.tipo_bien_contratado, 
            orden_compra: reclamo.orden_compra, 
            codigo_producto: reclamo.codigo_producto, 
            fecha_compra: reclamo.fecha_compra, 
            forma_respuesta: reclamo.forma_respuesta, 
            fecha_reclamo: reclamo.fecha_reclamo, 
            detalle_reclamo: reclamo.detalle_reclamo, 
            monto_reclamado: reclamo.monto_reclamado, 
            peticion_cliente: reclamo.peticion_cliente, 
            acciones_tomadas: editAccionesTomadas,
            estado: estadoNuevo, 
            fecha_respuesta: fechaRespuesta, 
            fecha_limite: reclamo.fecha_limite   
          }

      const updateData = {
          acciones_tomadas: editAccionesTomadas,
          fecha_respuesta: fechaRespuesta
      };
      try {
        openModal();
        const response = await api.patch(`/reclamos/actions/${reclamo.id_reclamo}`, updateData);
      } catch (err) {
        if (err.response) {
          console.log("Error de respuesta:", err.response.data);
          console.log("Código de estado HTTP:", err.response.status);
          console.log("Encabezados de respuesta:", err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
        openModal();
        setErrorMessage('Error de procesamiento');
      } finally {
        setProcessing(false);
      }
    }

    useEffect(() => {
        const fetchReclamos = async () => {
          try {
            const response = await api.get('/reclamos');// Llamar API
            setReclamos(response.data);
          } catch (err) {
            if (err.response) {
              // Not in the 200 response range 
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
              setError('Error not found');
            } else {
              console.log(`Error: ${err.message}`);
              setError('Error desconocido');
            }
          }
        }
        
        fetchReclamos()//asincrono
    }, [])

    useEffect(() => {
        if(reclamos && reclamos.length > 0){
          console.log("reclamos[0].id",reclamos[0].id_reclamo)
          setReclamo(reclamos.find(reclamo => (reclamo.id_reclamo).toString() === id))
        }
    }, [reclamos]);


    useEffect(() => {
        if (reclamo) {
            const fetchCliente = async () => {
                try {
                  const response = await apiClientes.get(`/clientes/buscarPorDNI/${reclamo.id_cliente}`);// Llamar API
                  setUsuario(response.data);
                } catch (err) {
                  if (err.response) {
                    // Not in the 200 response range 
                    console.log("Error no en 200 ")
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                    setError('Error not found');
                  } else {
                    console.log(`Error: ${err.message}`);
                    setError('Error desconocido');
                  }
                }
            }
            fetchCliente()
        }
    }, [reclamo])

    useEffect(() => {
        if (reclamo) {
            setEditAccionesTomadas(reclamo.acciones_tomadas)
            if(editAccionesTomadas !== null){
                console.log("HOla")
            }
            const fechaActual = new Date();
            const formatoFecha = format(fechaActual, 'yyyy-MM-dd');
            setFechaRespuesta(formatoFecha)
        }
    }, [reclamo, setEditAccionesTomadas])

    useEffect(() => {
      if(usuario && editAccionesTomadas){
        console.log("Usuairo usuario fetch useEffect" , usuario)
        console.log("Acciones fetch useEffect" , editAccionesTomadas)
          }
    }, [usuario]);
  return (
    <main className="Form">
    {true ? (
        <>
          {(reclamo !== undefined && reclamo !== null)? (
            <>
              <form className="" onSubmit={(e) => handleEdit(e)}>
                  <h1>Actualizar Reclamo</h1>
                  <h2>Datos del Cliente</h2>
                  <div>
                      <InputReadOnly titulo={"DNI"} dato={usuario.dni} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Apellido"} dato={usuario.apellido} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Nombre"} dato={usuario.nombre} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Departamento"} dato={usuario.departamento} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Distrito"} dato={usuario.distrito} />
                  </div>
                  <h2>Informacion del Reclamo</h2>
                  <div>
                      <InputReadOnly titulo={"Id de Reclamo"} dato={reclamo? reclamo.id_reclamo : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Tipo de Reclamo"} dato={reclamo? reclamo.id_tipo_reclamo : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Tipo de Bien Contratado"} dato={reclamo? reclamo.tipo_bien_contratado : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Orden de Compra"} dato={reclamo? reclamo.orden_compra : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Codigo de Producto"} dato={reclamo? reclamo.codigo_producto : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Fecha Compra"} dato={reclamo? reclamo.fecha_compra : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Forma de Respuesta"} dato={reclamo? reclamo.forma_respuesta : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Fecha de Reclamo"} dato={reclamo? reclamo.fecha_reclamo : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Detalle de Reclamo"} dato={reclamo? reclamo.detalle_reclamo : ""} />
                  </div>                
                  <div>
                      <InputReadOnly titulo={"Monto Reclamado"} dato={reclamo? reclamo.monto_reclamado : ""} />
                  </div>                
                  <div>
                      <InputReadOnly titulo={"Peticion del Cliente"} dato={reclamo? reclamo.peticion_cliente : ""} />
                  </div>
                  <div>
                      <label htmlFor='accionedTomadas'>
                      Acciones Tomadas
                      </label>
                      <textarea
                      style={{
                          border: editAccionesTomadas ? '1px solid #ccc' : '2px solid #ff0000',
                          borderRadius: '5px',
                          padding: '8px',
                        }}
                      id='accionedTomadas'
                      type="text"
                      value={editAccionesTomadas?editAccionesTomadas: ""}
                      onChange={(e) => setEditAccionesTomadas(e.target.value)}
                      required
                      />
                  </div>                
                  <div>
                      <InputReadOnly titulo={"Estado"} dato={reclamo? reclamo.estado: ""} />
                  </div>
                  <div>
                      <InputReadOnly 
                          titulo={"Fecha de Respuesta"} 
                          dato={fechaRespuesta} 
                      />
                  </div>                
                  <div>
                      <InputReadOnly titulo={"Fecha Limita"} dato={reclamo? reclamo.fecha_limite: ""} />
                  </div>                
                  <div className='FormBotones'>
                      {/* Boton para confirmar el registro */}
                      <button className='buttonSolicitud'
                          type='submit'
                      >
                          Resolver
                      </button>
                      <button
                          className='buttonCancelar'
                          type="button"
                          onClick={() => {history.push('/reclamos')}}
                      >Cancelar</button>
                  </div>
              </form>             
              <Modal
              showModal={modalVisible} 
              closeModal={closeModal}
              processing={processing}
              errorMessage={errorMessage}
              redireccion={"Reclamos"}
              />
            </>):(
            <>
              {reclamo === null && ( // Buscando
              <>
                <div className='topElementos'>
                  <div className='seleccionar'>
                    <p 
                      style={{color: '#007BFF', padding: '10px',border: '2px solid #007BFF',borderRadius: '8px',fontSize: '14px',fontWeight: 'bold',display: 'inline-block',width: '100%'}}
                    >Cargando datos ...</p></div></div>
              </>)}
              {(reclamo === undefined &&
              <>
                <h2>Post Not Found</h2>
                <p>Well, that's disahhppointing.</p>
                <p>
                    <Link to='/'>Visit Our Homepage</Link>
                </p>
              </>)}
        </>)}
        </>
    ):
    (
        <>
          {error === null? (
          <>
            <div className='topElementos'>
              <div className='seleccionar'>
                <p 
                  style={{color: '#007BFF', padding: '10px',border: '2px solid #007BFF',borderRadius: '8px',fontSize: '14px',fontWeight: 'bold',display: 'inline-block',width: '100%'}}
                >Cargando datos ...</p></div></div>
          </>):(
          <>
            <h2>Error {error}</h2>
            <p>Well, that's disahhppointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>)}

        </>
    )}
</main>
  )
}

export default EditarReclamo