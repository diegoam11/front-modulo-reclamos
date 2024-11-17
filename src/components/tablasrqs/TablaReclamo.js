import React from 'react'
import {BsFillEyeFill, BsFillPencilFill} from 'react-icons/bs'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import InputSelectDefault from '../elements/InputSelectDefault';
import "./Table.css"

import apiBack from '../../api/api'

function TablaReclamo({ }) {

  
  const [estadoFeedBack, setEstadoFeedBack] = useState(0)//
  const [datosR, setDatosR] = useState(null)
  const [areaRespon, setareaRespon] = useState(0)//
  
  const [reclamos, setReclamos] = useState([])
  
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log("datosR es:", datosR)
    
  }, [])
  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        const response = await apiBack.get('/reclamos');
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
    fetchReclamos()
  }, [])


  useEffect(() => {
    const filteredResults = reclamos.filter(reclamo => reclamo.id_reclamo > 0);
    setDatosR(filteredResults);
  }, [reclamos]);


  useEffect(() => {
    console.log("datosR es:", datosR)   
    
  }, [datosR])


  useEffect(() => {
    const filteredResults = reclamos; 

    setDatosR(filteredResults);
  }, [estadoFeedBack])


  //FILTRADO DE TIPOS DE RECLAMOS SEGUN ESTADO
  const numerosEstado = [
    [],       // Todos
    [0],      //Derivado
    [1] //Resuelto
  ];

  //FILTRADO DE TIPOS DE RECLAMOS DE UN AREA MODULO
  const numerosPorArea = [
    [],           // Área 0
    [11],           // Área 1
    [4, 5, 8],    // Área 2
    [1, 2, 7, 10], // Área 3
    [3, 6],       // Área 4
    [9],          // Área 5
    []            // Área 6
  ];

  const tiposDeReclamo = [
    'Cero',
    'Otros' ,//3
    'Producto Errado y/o Caracteristic...' ,//3
    'Producto con falla de funcionamiento' ,//4
    'Producto no estregado o con retraso' ,  //2
    'Error precio' ,  //2
    'Producto con daño Fisico' ,  //4
    'Producto incompleto' ,  //3
    'Incumplimiento de Promocion' ,//2
    'Publicidad engañosa' , 
    'Problemas de facturación']//3

  const obtenerTipoReclamo = (id) => {
    switch (id) {
      case 1:
        return tiposDeReclamo[1]
      case 2:
        return tiposDeReclamo[2]
      case 3:
        return tiposDeReclamo[3]
      case 4:
        return tiposDeReclamo[4]
      case 5:
        return tiposDeReclamo[5]
      case 6:
        return tiposDeReclamo[6]
      case 7:
        return tiposDeReclamo[7]
      case 8:
        return tiposDeReclamo[8]
      case 9:
        return tiposDeReclamo[9]
      case 10:
        return tiposDeReclamo[10]
      default:
        return ""
    }
  }

  const filtrarReclamos = () => {
    if (areaRespon === 0) {

       if (estadoFeedBack === 0) {
         // Si estadoFeedBack es 0, mostrar todos los reclamos
         return reclamos;
       } else {
      //   // Filtrar reclamos según el estado asociado a estadoFeedBack
         const numeroEstado = numerosEstado[estadoFeedBack];
         return reclamos.filter(reclamo => numeroEstado.includes(reclamo.id_estado));
       }
      //return reclamos;
    } else {
      // Filtrar reclamos según los números asociados a areaRespon
      const numerosArea = numerosPorArea[areaRespon];
      const reclamosFiltrado = reclamos.filter(reclamo =>
        numerosArea.includes(reclamo.id_tipo_reclamo)
      );
      
        if (estadoFeedBack === 0) {
          // Si estadoFeedBack es 0, mostrar todos los reclamos
          return reclamosFiltrado;
        } else {
          // Filtrar reclamos según el estado asociado a estadoFeedBack
          const numeroEstado = numerosEstado[estadoFeedBack];
          return reclamosFiltrado.filter(reclamo => numeroEstado.includes(reclamo.id_estado));
        }

    }
  };

  useEffect(() => {
    setDatosR(filtrarReclamos())
    //que tipos de reclamos corresponden a un area responsable
    //1 -> Clientes
    //2 -> Ventas 4 5 8
    //3 -> Reclamos 1 2 7 10
    //4 -> Reparaciones 3 6
    //5 -> Marketing 9
    //6 -> Autoconsulta

    //RECLAMOS
    // [{ label: 'Otros', value: 1 },//3
    // { label: 'Producto Errado y/o Caracteristicas Distintas', value: 2 },//3
    // { label: 'Producto con falla de funcionamiento', value: 3 },//4
    // { label: 'Producto no estregado o con retraso', value: 4 },  //2
    // { label: 'Error precio', value: 5 },  //2
    // { label: 'Producto con daño Fisico', value: 6 },  //4
    // { label: 'Producto incompleto', value: 7 },  //3
    // { label: 'Incumplimiento de Promocion', value: 8 },//2
    // { label: 'Publicidad engañosa', value: 9 },  //5
    // { label: 'Problemas de facturación', value: 10 }]//3
  }, [reclamos, areaRespon, estadoFeedBack])



  return (
    <div className='paginaTabla'>
    <div className='topElementos'>
      <div className='seleccionar'>
      <h2>Lista de Reclamos</h2>
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
      <div>
      <h3>
        Area Responsable
      </h3>
      <InputSelectDefault
        setElement={setareaRespon}
        elements={ 
            [{ label: 'Todos', value: 0 },
            { label: 'Clientes', value: 1 },
            { label: 'Ventas', value: 2 },
            { label: 'Reclamos, Solicitudes y Quejas', value: 3 },
            { label: 'Reparaciones', value: 4 },
            { label: 'Marketing', value: 5 },
            { label: 'Autoconsulta', value: 6 }]
    //1 -> Clientes
    //2 -> Ventas
    //3 -> Reclamos
    //4 -> Reparaciones
    //5 -> Marketing
    //6 -> Autoconsulta
        }
        defaultValue={{ label: 'Todos', value: 0 }} // Valor predeterminado seleccionado
      />
      </div>
      </div>
    </div>
    {(datosR !== null && datosR.length !== false && !error) && (  
      
    <div className='table-wrapper'>
      {reclamos.length?
      <>{
        datosR.length > 0  ? (
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo de reclamo</th>
              <th>Estado</th>
              <th className='expand'>Descripcion</th>
              <th>Registrado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              datosR.map((reclamoClase, idx) => {

                return (<tr key={idx}>
                  <td>{reclamoClase.id_reclamo}</td>
                  <td>{reclamoClase? obtenerTipoReclamo(reclamoClase.id_tipo_reclamo)
                  : ""}</td>
                  <td>{reclamoClase.estado}</td>
                  <td>{
                    (reclamoClase.detalle_reclamo).length <= 45
                      ? reclamoClase.detalle_reclamo
                      : `${(reclamoClase.detalle_reclamo).slice(0,45)}...`
                  }</td>
                  <td>{reclamoClase.fecha_reclamo}</td>
                  <td>
                    <span className='actions'>
                      <Link to={`Reclamo/${reclamoClase.id_reclamo}`}  title="Ver"><BsFillEyeFill /></Link>
                      <Link to={`editarReclamo/${reclamoClase.id_reclamo}`}  title="Editar"><BsFillPencilFill/></Link>
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
            style={{color: '#007BFF', padding: '10px',border: '2px solid #007BFF',borderRadius: '8px',fontSize: '14px',fontWeight: 'bold',display: 'inline-block',width: '100%'}}
          >Cargando datos ...</p></div></div>
      </>}
      {/* <p>Finalizado Elemento 1: {datosR.length?`${datosR.length} y ${datosR[0].id_cliente}`: `${datosR.length}`}</p> */}
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

export default TablaReclamo