import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { format } from 'date-fns'
import api from '../../api/api'
import apiClientes from '../../api/clientes'
import InputReadOnly from './InputReadOnly';
import '../formulariosrqs/formRQS.css'
import Modal from '../elements/Modal';

const EditarSolicitud = ({ 
    editAccionesTomadas, setEditAccionesTomadas, modalVisible, closeModal, processing, errorMessage, openModal, setProcessing, setErrorMessage
}) => {

    const { id } = useParams();
    const [usuario, setUsuario] = useState({})
    const [cliente, setCliente] = useState()
    const [solicitudes, setSolicitudes] = useState(null)
    const [solicitud, setSolicitud] = useState(null)
    const [fechaRespuesta, setFechaRespuesta] = useState("")

    const [error, setError] = useState(null)
    const history = useHistory()

    const handleEdit = async (e) => {
      e.preventDefault();
      setProcessing(true);
        const estadoNuevo = 1
        const updatedReclamo = {
            id: solicitud.id,
            id_cliente: solicitud.id_cliente,
            id_tipo_reclamo: solicitud.id_tipo_reclamo, 
            tipo_bien_contratado: solicitud.tipo_bien_contratado, 
            orden_compra: solicitud.orden_compra, 
            codigo_producto: solicitud.codigo_producto, 
            fecha_compra: solicitud.fecha_compra, 
            forma_respuesta: solicitud.forma_respuesta, 
            fecha_reclamo: solicitud.fecha_reclamo, 
            detalle_reclamo: solicitud.detalle_reclamo, 
            monto_reclamado: solicitud.monto_reclamado, 
            peticion_cliente: solicitud.peticion_cliente, 
            acciones_tomadas: editAccionesTomadas,
            estado: estadoNuevo, 
            fecha_respuesta: fechaRespuesta, 
            fecha_limite: solicitud.fecha_limite   
          }

        const updateData = {acciones_tomadas: editAccionesTomadas,fecha_respuesta: fechaRespuesta};
        try {
          openModal();
          const response = await api.patch(`/solicitudes/actions/${solicitud.id_solicitud}/`, updateData);
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
            const response = await api.get('/solicitudes');// Llamar API
            setSolicitudes(response.data);
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
        if(solicitudes && solicitudes.length > 0){
          console.log("solicitudes[0].id",solicitudes[0].id_solicitud)
          setSolicitud(solicitudes.find(solicitud => (solicitud.id_solicitud).toString() === id))
        }
    }, [solicitudes]);


    useEffect(() => {
        if (solicitud) {
            const fetchCliente = async () => {
                try {
                  const response = await apiClientes.get(`/clientes/buscarPorDNI/${solicitud.id_cliente}`);// Llamar API
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
    }, [solicitud])

    useEffect(() => {
        if (solicitud) {
            setEditAccionesTomadas(solicitud.acciones_tomadas)
            if(editAccionesTomadas !== null){
                console.log("HOla")
            }
            const fechaActual = new Date();
            const formatoFecha = format(fechaActual, 'yyyy-MM-dd');
            setFechaRespuesta(formatoFecha)
        }
    }, [solicitud, setEditAccionesTomadas])

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
          {(solicitud !== undefined && solicitud !== null)? (
            <>
              <form className="" onSubmit={(e) => handleEdit(e)}>
                  <h1>Actualizar Solicitud</h1>
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
                      <InputReadOnly titulo={"Id de Solicitud"} dato={solicitud? solicitud.id_solicitud : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Tipo de Solicitud"} dato={solicitud? solicitud.id_tipo_solicitud : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Tipo de Bien Contratado"} dato={solicitud? solicitud.tipo_bien_contratado : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Orden de Compra"} dato={solicitud? solicitud.orden_compra : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Codigo de Producto"} dato={solicitud? solicitud.codigo_producto : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Forma de Respuesta"} dato={solicitud? solicitud.forma_respuesta : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Fecha de Solicitud"} dato={solicitud? solicitud.fecha_solicitud : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Detalle de Solicitud"} dato={solicitud? solicitud.detalle_solicitud : ""} />
                  </div>               
                  <div>
                      <InputReadOnly titulo={"Peticion del Cliente"} dato={solicitud? solicitud.peticion_cliente : ""} />
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
                      <InputReadOnly titulo={"Estado"} dato={solicitud? solicitud.estado: ""} />
                  </div>
                  <div>
                      <InputReadOnly 
                          titulo={"Fecha de Respuesta"} 
                          dato={fechaRespuesta} 
                      />
                  </div>                
                  <div>
                      <InputReadOnly titulo={"Fecha Limite"} dato={solicitud? solicitud.fecha_limite: ""} />
                  </div>                
                  <div className='FormBotones'>
                      {/* Boton para confirmar el registro */}
                      <button className='buttonSolicitud'
                          type='submit'//handleEdit(solicitud.id)}
                      >
                          Resolver
                      </button>
                      <button
                          className='buttonCancelar'
                          type="button"
                          onClick={() => {history.push('/solicitudes')}}
                      >Cancelar</button>
                  </div>
              </form>
              <Modal
              showModal={modalVisible} 
              closeModal={closeModal}
              processing={processing}
              errorMessage={errorMessage}
              redireccion={"Solicitudes"}
              />
            </>):(
            <>
              {solicitud === null && ( // Buscando
              <>
                <div className='topElementos'>
                  <div className='seleccionar'>
                    <p 
                      style={{color: '#007BFF', padding: '10px',border: '2px solid #007BFF',borderRadius: '8px',fontSize: '14px',fontWeight: 'bold',display: 'inline-block',width: '100%'}}
                    >Cargando datos ...</p></div></div>
              </>)}
              {(solicitud === undefined &&
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

export default EditarSolicitud