import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { format } from 'date-fns'
import api from '../../api/api'
import apiClientes from '../../api/clientes'
import InputReadOnly from './InputReadOnly';
import '../formulariosrqs/formRQS.css'
import Modal from '../elements/Modal';

const EditarQueja = ({ 
    editAccionesTomadas, setEditAccionesTomadas, modalVisible, closeModal, processing, errorMessage, openModal, setProcessing, setErrorMessage
}) => {

    const { id } = useParams();
    const [usuario, setUsuario] = useState({})
    const [cliente, setCliente] = useState()
    const [quejas, setQuejas] = useState(null)
    const [queja, setQueja] = useState(null)
    const [fechaRespuesta, setFechaRespuesta] = useState("")

    const [error, setError] = useState(null)
    const history = useHistory()

    const handleEdit = async (e) => {
      e.preventDefault();
      setProcessing(true);
        const estadoNuevo = 1
        const updatedReclamo = {
            id: queja.id,
            id_cliente: queja.id_cliente,
            id_tipo_reclamo: queja.id_tipo_reclamo, 
            tipo_bien_contratado: queja.tipo_bien_contratado, 
            orden_compra: queja.orden_compra, 
            codigo_producto: queja.codigo_producto, 
            fecha_compra: queja.fecha_compra, 
            forma_respuesta: queja.forma_respuesta, 
            fecha_reclamo: queja.fecha_reclamo, 
            detalle_reclamo: queja.detalle_reclamo, 
            monto_reclamado: queja.monto_reclamado, 
            peticion_cliente: queja.peticion_cliente, 
            acciones_tomadas: editAccionesTomadas,
            estado: estadoNuevo, 
            fecha_respuesta: fechaRespuesta, 
            fecha_limite: queja.fecha_limite   
          }
      
        const updateData = {
          acciones_tomadas: editAccionesTomadas,
          fecha_respuesta: fechaRespuesta
        };
      try {
        openModal();
        const response = await api.patch(`/quejas/actions/${queja.id_queja}`, updateData);
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
            const response = await api.get('/quejas');// Llamar API
            setQuejas(response.data);
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
        if(quejas && quejas.length > 0){
          console.log("quejas[0].id",quejas[0].id)
          setQueja(quejas.find(queja => (queja.id_queja).toString() === id))
        }
    }, [quejas]);


    useEffect(() => {
        if (queja) {
            const fetchCliente = async () => {
                try {
                  const response = await apiClientes.get(`/clientes/buscarPorDNI/${queja.id_cliente}`);// Llamar API
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
    }, [queja])

    useEffect(() => {
        if (queja) {
            setEditAccionesTomadas(queja.acciones_tomadas)
            if(editAccionesTomadas !== null){
                console.log("HOla")
            }
            const fechaActual = new Date();
            const formatoFecha = format(fechaActual, 'yyyy-MM-dd');
            setFechaRespuesta(formatoFecha)
        }
    }, [queja, setEditAccionesTomadas])

    useEffect(() => {
      if(usuario && editAccionesTomadas){
        console.log("Usuairo usuario fetch useEffect" , usuario)
        console.log("Acciones fetch useEffect" , editAccionesTomadas)
          }
    }, [usuario]);
  return (
    <main className="Form">
    {quejas ? (
        <>
          {(queja !== undefined && queja !== null)? (
            <>
              <form className="" onSubmit={(e) => handleEdit(e)}>
                  <h1>Actualizar Queja</h1>
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
                  <h2>Informacion de Queja</h2>
                  <div>
                      <InputReadOnly titulo={"Id de Queja"} dato={queja? queja.id_queja : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Tipo de Bien Contratado"} dato={queja? queja.tipo_bien_contratado : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Orden de Compra"} dato={queja? queja.orden_compra : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Codigo de Producto"} dato={queja? queja.codigo_producto : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Fecha Compra"} dato={queja? queja.fecha_compra : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Forma de Respuesta"} dato={queja? queja.forma_respuesta : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Fecha de Queja"} dato={queja? queja.fecha_queja : ""} />
                  </div>
                  <div>
                      <InputReadOnly titulo={"Detalle de Queja"} dato={queja? queja.detalle_queja : ""} />
                  </div>                
                  <div>
                      <InputReadOnly titulo={"Peticion del Cliente"} dato={queja? queja.peticion_cliente : ""} />
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
                      <InputReadOnly titulo={"Estado"} dato={queja? queja.estado: ""} />
                  </div>
                  <div>
                      <InputReadOnly 
                          titulo={"Fecha de Respuesta"} 
                          dato={fechaRespuesta} 
                      />
                  </div>                
                  <div>
                      <InputReadOnly titulo={"Fecha Limita"} dato={queja? queja.fecha_limite: ""} />
                  </div>                
                  <div className='FormBotones'>
                      {/* Boton para confirmar el registro */}
                      <button className='buttonSolicitud'
                        type='submit'//handleEdit(queja.id)}
                      >
                          Resolver
                      </button>
                      <button
                          className='buttonCancelar'
                          type="button"
                          onClick={() => {history.push('/quejas')}}
                      >Cancelar</button>
                  </div>
              </form>
              <Modal
              showModal={modalVisible} 
              closeModal={closeModal}
              processing={processing}
              errorMessage={errorMessage}
              redireccion={"Quejas"}
              />
            </>):(
            <>
              {queja === null && ( // Buscando
              <>
                <div className='topElementos'>
                  <div className='seleccionar'>
                    <p 
                      style={{color: '#007BFF', padding: '10px',border: '2px solid #007BFF',borderRadius: '8px',fontSize: '14px',fontWeight: 'bold',display: 'inline-block',width: '100%'}}
                    >Cargando datos ...</p></div></div>
              </>)}
              {(queja === undefined &&
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

export default EditarQueja