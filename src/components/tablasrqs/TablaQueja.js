import React from 'react'
import {BsFillEyeFill, BsFillPencilFill} from 'react-icons/bs'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import InputSelectDefault from '../elements/InputSelectDefault';
import "./Table.css"

import apiBack from '../../api/api'

function TablaQueja({}) {

  
  const [estadoFeedBack, setEstadoFeedBack] = useState(0)//
  const [datosQ, setDatosQ] = useState(null)
  
  const [quejas, setQuejas] = useState([])
  
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log("datosQ es:", datosQ)
    
  }, [])
  useEffect(() => {
    const fetchQuejas = async () => {
      try {
        const response = await apiBack.get('/quejas');
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
    fetchQuejas()
  }, [])


  useEffect(() => {
    const filteredResults = quejas.filter(elemento => elemento.id_queja > 0);
    setDatosQ(filteredResults);
  }, [quejas]);


  useEffect(() => {
    console.log("datosQ modificado es:", datosQ)   
    
  }, [datosQ])


  useEffect(() => {
    const filteredResults = quejas; 

    setDatosQ(filteredResults);
  }, [estadoFeedBack])

  //FILTRADO DE TIPOS DE QUJA SEGUN ESTADO
  const numerosEstado = [
    [-1],       // Todos
    [0],       //Pendiente
    [1] //Resuelto
  ];

  const filtrarQuejas = () => {
       if (estadoFeedBack === 0) {
         // Si estadoFeedBack es 0, mostrar todos los reclamos
         return quejas;
       } else {
      //   // Filtrar quejas según el estado asociado a estadoFeedBack
         const numeroEstado = numerosEstado[estadoFeedBack];
         return quejas.filter(queja => numeroEstado.includes(queja.id_estado));
       }
  };

  useEffect(() => {
    setDatosQ(filtrarQuejas())
  }, [quejas, estadoFeedBack])

  return (
    <div className='paginaTabla'>
    <div className='topElementos'>
      <div className='seleccionar'>
      <h2>Lista de Quejas</h2>
      <div>
      <InputSelectDefault
        setElement={setEstadoFeedBack}
        elements={ 
            [{ label: 'Todos', value: 0 },
            { label: 'Derivado', value: 1 },
            { label: 'Resuelto', value: 2 }]
        }
        defaultValue={{ label: 'Todos', value: 0 }} // Valor predeterminado seleccionado
      />
      </div>
      </div>
    </div>
    {(datosQ !== null && datosQ.length !== false && !error) && (  
      
    <div className='table-wrapper'>
      {quejas.length?
      <>{
        datosQ.length > 0  ? (
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo de reclamo</th>
              <th>Categoria</th>
              <th className='expand'>Descripcion</th>
              <th>Registrado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              datosQ.map((quejaClase, idx) => {

                return (<tr key={idx}>
                  <td>{quejaClase.id_queja}</td>
                  <td>{quejaClase.estado}</td>
                  <td>{quejaClase.tipo_bien_contratado}</td>
                  <td>{
                    (quejaClase.detalle_queja).length <= 45
                      ? quejaClase.detalle_queja
                      : `${(quejaClase.detalle_queja).slice(0,45)}...`
                  }</td>
                  <td>{quejaClase.fecha_queja}</td>
                  <td>
                    <span className='actions'>
                      <Link to={`Queja/${quejaClase.id_queja}`}  title="Ver"><BsFillEyeFill /></Link>
                      <Link to={`editarQueja/${quejaClase.id_queja}`}  title="Editar"><BsFillPencilFill/></Link>
                    </span>
                  </td>
                </tr>)
              })
            }
          </tbody>
        </table>
      ) : (
        <div className='topElementos'>
        <div className='seleccionar'>
          <p 
            style={{
              color: '#007BFF',
              padding: '10px',
              border: '2px solid #007BFF',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'inline-block',
              width: '100%'
            }}
          >
          No posts to display.
          </p></div></div>
      )}
      </>: 
      <>
      <div className='topElementos'>
        <div className='seleccionar'>
          <p 
            style={{
              color: '#007BFF',
              padding: '10px',
              border: '2px solid #007BFF',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'inline-block',
              width: '100%'
            }}
          >Cargando datos ...</p></div></div>
      </>}
      {/* <p>Finalizado Elemento 1: {datosQ.length?`${datosQ.length} y ${datosQ[0].id_cliente}`: `${datosQ.length}`}</p> */}
  </div>
    )}
    {error && (
      <>
        <div className='topElementos'>
          <div className='seleccionar'>
            <p 
              style={{color: '#e10d05', padding: '10px', border: '2px solid #e10d05', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', display: 'inline-block', width: '100%'}}
            >{error} ...</p></div></div>        
        </>
    )}     

    </div>
  )
}

export default TablaQueja