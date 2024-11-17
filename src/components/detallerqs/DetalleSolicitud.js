import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../../api/api'
import apiClientes from '../../api/clientes'
import { Document, Page, View, Text, PDFDownloadLink } from "@react-pdf/renderer";

import './detalleRQS.css'

const DetalleSolicitud = ({ }) => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null)
  const [solicitudes, setSolicitudes] = useState(null)
  const [solicitud, setSolicitud] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const [found, setFound] = useState(false)

  useEffect(() => {
    const fetchSolicitudes = async () => {
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
    
    fetchSolicitudes()//asincrono
  }, [])

  useEffect(() => {
    if(solicitudes && solicitudes.length > 0){
      //console.log(solicitudes[0].id)
      setSolicitud(solicitudes.find(solicitud => (solicitud.id_solicitud).toString() === id))
    }
  }, [solicitudes]);

  useEffect(() => {
    if(solicitud){
      //console.log("Reclamo no nulo") No nulo es {} "Objeto vacio "y Nulo es null
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
          } else {

            console.log(`Error: ${err.message}`);
          }
        }
      }
      fetchCliente()
    }

  }, [solicitud]);

  // useEffect(() => {
  //   if(usuario){
  //     console.log(usuario)
      
  //   }
  // }, [usuario]);
  

  return (
    <div className='detalleRQS'>
      <div className='infoRQS'>
      {solicitudes?(
        <>
          {(solicitud !== undefined && solicitud !== null)? (
          <>
            <>
            <div style={{ display: 'block', textAlign: 'center' }}>
              <h1>Detalle del Solicitud</h1>
            </div>
            <div className='informacionRQS'>
              <div>
              <h2>Informacion del Solicitud</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>ID del Solicitud:</span> {solicitud.id_solicitud}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Id del cliente:</span> {solicitud.id_cliente}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Tipo de solicitud:</span> {solicitud.id_tipo_solicitud}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha de registro:</span> {solicitud.fecha_solicitud}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Estado Solicitud:</span> {solicitud.estado}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Detalle Solicitud:</span> {solicitud.detalle_solicitud}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Peticion del cliente:</span> {solicitud.peticion_cliente}</p>
                </div>
            </div>
            <div className='informacionRQS'>
              <div>
              <h2>Informacion del Producto</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Tipo de bien contratado:</span> {solicitud.tipo_bien_contratado}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Orden de compra:</span> {solicitud.orden_compra}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Codigo de producto:</span> {solicitud.codigo_producto}</p>
                </div>
            </div>
            <div className='informacionRQS'>
              <div>
              <h2>Datos del cliente</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>DNI:</span> {usuario? usuario.dni : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Nombre:</span> {usuario? usuario.nombre : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Apellido:</span> {usuario? usuario.apellido : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Departamento:</span> {usuario? usuario.departamento : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Distrito:</span> {usuario? usuario.distrito : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Correo:</span> {usuario? usuario.correo : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Sexo:</span> {usuario? usuario.sexo : ""}</p>
                </div>
            </div>            
            <div className='informacionRQS'>
              <div>
              <h2>Resolución de Solicitud</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Forma de respuesta</span> {solicitud? solicitud.forma_respuesta : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha de respuesta:</span> {solicitud? solicitud.fecha_respuesta : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha limite:</span> {solicitud? solicitud.fecha_limite : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Acciones tomadas:</span> {solicitud? solicitud.acciones_tomadas : ""}</p>
                </div>
            </div>            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'  }}>          
            <p style={{ marginRight: 'auto' }}><Link to='/Reclamos'>Regresar</Link></p>
                    <PDFDownloadLink style={{padding: '8px 16px', backgroundColor: '#007bff', color: '#fff',border: 'none',cursor: 'pointer', display: 'flex',alignItems: 'center'  }} document={
                      <Document>
                        <Page>
                          <Text style={{ fontSize: 12, marginTop: 20, textAlign: 'center' }}>Hoja de Solicitud</Text>
                          <View style={{ border: '1px solid black', margin: 30, fontSize: 12 }}>

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Detalle del Solicitud</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>ID del Solicitud: {solicitud.id_solicitud}</Text>
                              <Text>Id del cliente: {solicitud.id_cliente}</Text>
                              <Text>Tipo de Solicitud: {solicitud.id_tipo_solicitud}</Text>
                              <Text>Fecha de registro: {solicitud.fecha_solicitud}</Text>
                              <Text>Estado Solicitud: {solicitud.estado}</Text>
                              <Text>Detalle solicitud: {solicitud.detalle_solicitud}</Text>
                              <Text>Peticion del cliente: {solicitud.peticion_cliente}</Text>
                            </View>

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Información del producto</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>Tipo de bien contratado: {solicitud.tipo_bien_contratado}</Text>
                              <Text>Orden de compra: {solicitud.orden_compra}</Text>
                              <Text>Codigo de producto: {solicitud.codigo_producto}</Text>
                            </View>

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Datos del cliente</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>DNI: {usuario ? usuario.dni : ""}</Text>
                              <Text>Nombre: {usuario ? usuario.nombre : ""}</Text>
                              <Text>Apellido: {usuario ? usuario.apellido : ""}</Text>
                              <Text>Departamento: {usuario ? usuario.departamento : ""}</Text>
                              <Text>Distrito: {usuario ? usuario.distrito : ""}</Text>
                              <Text>Correo: {usuario ? usuario.correo : ""}</Text>
                              <Text>Sexo: {usuario ? usuario.sexo : ""}</Text>
                            </View>

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Resolución del solicitud</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>Forma de respuesta: {solicitud ? solicitud.forma_respuesta : ""}</Text>
                              <Text>Fecha de respuesta: {solicitud ? solicitud.fecha_respuesta : ""}</Text>
                              <Text>Fecha limite: {solicitud ? solicitud.fecha_limite : ""}</Text>
                              <Text>Acciones tomadas: {solicitud ? solicitud.acciones_tomadas : ""}</Text>
                            </View>
                          </View>
                        </Page>
                      </Document>
                    }

                      fileName='reclamo_rep.pdf'>
                      <button style={{marginLeft: '8px', padding: '8px 16px',backgroundColor: '#007bff', color: '#fff', border: 'none',cursor: 'pointer'}}>Ver detalle en pdf</button>
                    </PDFDownloadLink>    
                    </div>  
            </>
          </>):(
          <>
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

            </>
          </>)}

        </>
      ):(

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
      </div>
    </div>
  );
}

export default DetalleSolicitud;