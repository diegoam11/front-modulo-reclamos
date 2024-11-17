import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../../api/api'
import apiClientes from '../../api/clientes'
import { Document, Page, View, Text, PDFDownloadLink } from "@react-pdf/renderer";

import './detalleRQS.css' 

const DetalleReclamo = ({ }) => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null)
  const [reclamos, setReclamos] = useState(null)
  const [reclamo, setReclamo] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const [found, setFound] = useState(false)

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
      //console.log(reclamos[0].id)
      setReclamo(reclamos.find(reclamo => (reclamo.id_reclamo).toString() === id))
    }
  }, [reclamos]);

  useEffect(() => {
    if(reclamo){
      //console.log("Reclamo no nulo") No nulo es {} "Objeto vacio "y Nulo es null
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
          } else {

            console.log(`Error: ${err.message}`);
          }
        }
      }
      fetchCliente()
    }

  }, [reclamo]);
  

  return (
    <div className='detalleRQS'>
      <div className='infoRQS'>
      {reclamos?(
        <>
          {(reclamo !== undefined && reclamo !== null)? (
          <>
            <>
            <div style={{ display: 'block', textAlign: 'center' }}>
              <h1>Detalle del Reclamo</h1>
            </div>
            <div className='informacionRQS'>
              <div>
              <h2>Informacion del Reclamo</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>ID del Reclamo:</span> {reclamo.id_reclamo}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Id del cliente:</span> {reclamo.id_cliente}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Tipo de reclamo:</span> {reclamo.id_tipo_reclamo}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha de registro:</span> {reclamo.fecha_reclamo}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Estado Reclamo:</span> {reclamo.estado}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Detalle reclamoado:</span> {reclamo.detalle_reclamo}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Peticion del cliente:</span> {reclamo.peticion_cliente}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Monto reclamado:</span> {reclamo.monto_reclamado}</p>
                </div>
            </div>
            <div className='informacionRQS'>
              <div>
              <h2>Informacion del Producto</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Tipo de bien contratado:</span> {reclamo.tipo_bien_contratado}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Orden de compra:</span> {reclamo.orden_compra}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Codigo de producto:</span> {reclamo.codigo_producto}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha de Compra:</span> {reclamo.fecha_compra}</p>
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
              <h2>Resolución del reclamo</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Forma de respuesta</span> {reclamo? reclamo.forma_respuesta : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha de respuesta:</span> {reclamo? reclamo.fecha_respuesta : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha limite:</span> {reclamo? reclamo.fecha_limite : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Acciones tomadas:</span> {reclamo? reclamo.acciones_tomadas : ""}</p>
                </div>
            </div> 
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'  }}>          
            <p style={{ marginRight: 'auto' }}><Link to='/Reclamos'>Regresar</Link></p>
                    <PDFDownloadLink style={{padding: '8px 16px', backgroundColor: '#007bff', color: '#fff',border: 'none',cursor: 'pointer', display: 'flex',alignItems: 'center'  }} document={
                      <Document>
                        <Page>
                          <Text style={{ fontSize: 12, marginTop: 20, textAlign: 'center' }}>Hoja de Reclamación</Text>
                          <View style={{ border: '1px solid black', margin: 30, fontSize: 12 }}>

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Detalle del Reclamo</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>ID del Reclamo: {reclamo.id_reclamo}</Text>
                              <Text>Id del cliente: {reclamo.id_cliente}</Text>
                              <Text>Tipo de reclamo: {reclamo.id_tipo_reclamo}</Text>
                              <Text>Fecha de registro: {reclamo.fecha_reclamo}</Text>
                              <Text>Estado Reclamo: {reclamo.estado}</Text>
                              <Text>Detalle reclamado: {reclamo.detalle_reclamo}</Text>
                              <Text>Peticion del cliente: {reclamo.peticion_cliente}</Text>
                              <Text>Monto reclamado: {reclamo.monto_reclamado}</Text>
                            </View>

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Información del producto</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>Tipo de bien contratado: {reclamo.tipo_bien_contratado}</Text>
                              <Text>Orden de compra: {reclamo.orden_compra}</Text>
                              <Text>Codigo de producto: {reclamo.codigo_producto}</Text>
                              <Text>Fecha de Compra: {reclamo.fecha_compra}</Text>
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

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Resolución del reclamo</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>Forma de respuesta: {reclamo ? reclamo.forma_respuesta : ""}</Text>
                              <Text>Fecha de respuesta: {reclamo ? reclamo.fecha_respuesta : ""}</Text>
                              <Text>Fecha limite: {reclamo ? reclamo.fecha_limite : ""}</Text>
                              <Text>Acciones tomadas: {reclamo ? reclamo.acciones_tomadas : ""}</Text>
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

export default DetalleReclamo;