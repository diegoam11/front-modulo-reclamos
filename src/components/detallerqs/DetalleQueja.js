import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/api'
import apiClientes from '../../api/clientes'
import { Document, Page, View, Text, PDFDownloadLink } from "@react-pdf/renderer";

import './detalleRQS.css'

const DetalleQueja = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null)
  const [quejas, setQuejas] = useState(null)
  const [queja, setQueja] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchQuejas = async () => {
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
    
    fetchQuejas()//asincrono
  }, [])

  useEffect(() => {
    if(quejas && quejas.length > 0){
      //console.log(quejas[0].id)
      setQueja(quejas.find(queja => (queja.id_queja).toString() === id))
    }
  }, [quejas]);

  useEffect(() => {
    if(queja){
      //console.log("Reclamo no nulo") No nulo es {} "Objeto vacio "y Nulo es null
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
          } else {

            console.log(`Error: ${err.message}`);
          }
        }
      }
      fetchCliente()
    }

  }, [queja]);

  // useEffect(() => {
  //   if(usuario){
  //     console.log(usuario)
      
  //   }
  // }, [usuario]);
  

  return (
    <div className='detalleRQS'>
      <div className='infoRQS'>
      {quejas?(
        <>
          {(queja !== undefined && queja !== null)? (
          <>
            <>
            <div style={{ display: 'block', textAlign: 'center' }}>
              <h1>Detalle de Queja</h1>
            </div>
            <div className='informacionRQS'>
              <div>
              <h2>Informacion Queja</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>ID de Queja:</span> {queja.id_queja}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Id del cliente:</span> {queja.id_cliente}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha de registro:</span> {queja.fecha_queja}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Estado Queja:</span> {queja.estado}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Detalle Queja:</span> {queja.detalle_queja}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Peticion del cliente:</span> {queja.peticion_cliente}</p>
                </div>
            </div>
            <div className='informacionRQS'>
              <div>
              <h2>Informacion del Producto</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Tipo de bien contratado:</span> {queja.tipo_bien_contratado}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Orden de compra:</span> {queja.orden_compra}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Codigo de producto:</span> {queja.codigo_producto}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha de Compra:</span> {queja.fecha_compra}</p>
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
              <h2>Resolución de Queja</h2>
              </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Forma de respuesta</span> {queja? queja.forma_respuesta : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha de respuesta:</span> {queja? queja.fecha_respuesta : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Fecha limite:</span> {queja? queja.fecha_limite : ""}</p>
                </div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                  <p><span>Acciones tomadas:</span> {queja? queja.acciones_tomadas : ""}</p>
                </div>
            </div>            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'  }}>          
            <p style={{ marginRight: 'auto' }}><Link to='/Reclamos'>Regresar</Link></p>
                    <PDFDownloadLink style={{padding: '8px 16px', backgroundColor: '#007bff', color: '#fff',border: 'none',cursor: 'pointer', display: 'flex',alignItems: 'center'  }} document={
                      <Document>
                        <Page>
                          <Text style={{ fontSize: 12, marginTop: 20, textAlign: 'center' }}>Hoja de Queja</Text>
                          <View style={{ border: '1px solid black', margin: 30, fontSize: 12 }}>

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Detalle del Queja</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>ID del Queja: {queja.id_queja}</Text>
                              <Text>Id del cliente: {queja.id_cliente}</Text>
                              <Text>Fecha de registro: {queja.fecha_queja}</Text>
                              <Text>Estado Queja: {queja.estado}</Text>
                              <Text>Detalle queja: {queja.detalle_queja}</Text>
                              <Text>Peticion del cliente: {queja.peticion_cliente}</Text>
                            </View>

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Información del producto</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>Tipo de bien contratado: {queja.tipo_bien_contratado}</Text>
                              <Text>Orden de compra: {queja.orden_compra}</Text>
                              <Text>Codigo de producto: {queja.codigo_producto}</Text>
                              <Text>Fecha de Compra: {queja.fecha_compra}</Text>
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

                            <Text style={{ border: '0.5px solid black', backgroundColor: '#d8d8d8' }}>Resolución del queja</Text>
                            <View style={{ border: '0.5px solid black' }}>
                              <Text>Forma de respuesta: {queja ? queja.forma_respuesta : ""}</Text>
                              <Text>Fecha de respuesta: {queja ? queja.fecha_respuesta : ""}</Text>
                              <Text>Fecha limite: {queja ? queja.fecha_limite : ""}</Text>
                              <Text>Acciones tomadas: {queja ? queja.acciones_tomadas : ""}</Text>
                            </View>
                          </View>
                        </Page>
                      </Document>
                    }

                      fileName='queja_rep.pdf'>
                      <button style={{marginLeft: '8px', padding: '8px 16px',backgroundColor: '#007bff', color: '#fff', border: 'none',cursor: 'pointer'}}>Ver detalle en pdf</button>
                    </PDFDownloadLink>    
                    </div>  
            </>
          </>):(
          <>
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

export default DetalleQueja;