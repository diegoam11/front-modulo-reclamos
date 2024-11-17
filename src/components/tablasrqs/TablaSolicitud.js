  import React from 'react'
  import {BsFillEyeFill, BsFillPencilFill} from 'react-icons/bs'
  import { useEffect, useState } from "react";
  import { Link } from 'react-router-dom'
  import InputSelectDefault from '../elements/InputSelectDefault';
  import "./Table.css"
  
  import apiBack from '../../api/api'
import Title from 'antd/es/skeleton/Title';
  
  function TablaSolicitud({ }) {
  
    
    const [estadoFeedBack, setEstadoFeedBack] = useState(0)//
    const [datosS, setDatosS] = useState(null)
    const [areaRespon, setareaRespon] = useState(0)//
    
    const [solicitudes, setSolicitudes] = useState([])
    
    const [error, setError] = useState(null);
  
  
    useEffect(() => {
      console.log("datosS es:", datosS)
      
    }, [])
    useEffect(() => {
      const fetchSolicitudes = async () => {
        try {
          const response = await apiBack.get('/solicitudes');
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
      fetchSolicitudes()
    }, [])
  
  
    useEffect(() => {
      const filteredResults = solicitudes.filter(item => item.id_solicitud > 0);
      setDatosS(filteredResults);
    }, [solicitudes]);
  
  
    useEffect(() => {
      console.log("datosS es Solicitudes:", datosS)   
      
    }, [datosS])
  
  
    useEffect(() => {
      const filteredResults = solicitudes; 
  
      setDatosS(filteredResults);
    }, [estadoFeedBack])
  
      //FILTRADO DE TIPOS DE RECLAMOS SEGUN ESTADO
    const numerosEstado = [
      [-1],       //Todos
      [0],       //Derivado
      [1]        //Resuelto
    ];
  
    //FILTRADO DE TIPOS DE RECLAMOS DE UN AREA MODULO
    const numerosPorArea = [
      [],           // Área 0 TODOS
      [5],           // Área 1 CLIENTES
      [1, 2, 3, 8, 9],    // Área 2 VENTAS -----
      [], // Área 3 RECLAMOS 
      [4],       // Área 4 REPARAIONES
      [6],          // Área 5 MARKETINF
      []            // Área 6 AUTOCONSULTA
    ];

    const tiposDeSolicitud = [
      'Cero',
      'Cambio de Plan',  
      'Cancelacion de Servicio',  
      'Nuestro Servicio',  
      'Soporte Tecnico',  
      'Cambio de informacion personal',  
      'Descuentos y promociones',  
      'Informacion o consulta',  
      'Cambio de metodo de pago',
      'Otros']
  
    const obtenerTipoSolicitud = (id) => {
      switch (id) {
        case 1:
          return tiposDeSolicitud[1]
        case 2:
          return tiposDeSolicitud[2]
        case 3:
          return tiposDeSolicitud[3]
        case 4:
          return tiposDeSolicitud[4]
        case 5:
          return tiposDeSolicitud[5]
        case 6:
          return tiposDeSolicitud[6]
        case 7:
          return tiposDeSolicitud[7]
        case 8:
          return tiposDeSolicitud[8]
        case 9:
          return tiposDeSolicitud[9]
        default:
          return ""
      }
    }
  
    const filtrarSolicitudes = () => {
      if (areaRespon === 0) {
        // Si areaRespon es 0, mostrar todos los solicitudes
        if (estadoFeedBack === 0) {
          // Si estadoFeedBack es 0, mostrar todos los solicitudes
          return solicitudes;
        } else {
       //   // Filtrar solicitudes según el estado asociado a estadoFeedBack
          const numeroEstado = numerosEstado[estadoFeedBack];
          return solicitudes.filter(solicitud => numeroEstado.includes(solicitud.id_estado));
        }
       //return solicitudes;
      } else {
        // Filtrar solicitudes según los números asociados a areaRespon
        const numerosArea = numerosPorArea[areaRespon];
        const solicitudesFiltrado = solicitudes.filter(solicitud => solicitud.id_area_asociada === areaRespon)
        
          if (estadoFeedBack === 0) {
            // Si estadoFeedBack es 0, mostrar todos los reclamos
            return solicitudesFiltrado;
          } else {
            // Filtrar reclamos según el estado asociado a estadoFeedBack
            const numeroEstado = numerosEstado[estadoFeedBack];
            return solicitudesFiltrado.filter(reclamo => numeroEstado.includes(reclamo.id_estado));
          }
      }
    };
  
    useEffect(() => {
      setDatosS(filtrarSolicitudes())
      //que tipos de solicitudes corresponden a un area responsable
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
    }, [solicitudes, areaRespon, estadoFeedBack])
  
  
  
    return (
      <div className='paginaTabla'>
      <div className='topElementos'>
        <div className='seleccionar'>
        <h2>Lista de Solicitudes</h2>
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
      {(datosS !== null && datosS.length !== false && !error) && (  
        
      <div className='table-wrapper'>
        {solicitudes.length?
        <>{
          datosS.length > 0  ? (
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
                datosS.map((reclamoClase, idx) => {
  
                  return (<tr key={idx}>
                    <td>{reclamoClase.id_solicitud}</td>
                    <td>{reclamoClase? obtenerTipoSolicitud(reclamoClase.id_tipo_solicitud)
                    : ""}</td>
                    <td>{reclamoClase.estado}</td>
                    <td>{
                      (reclamoClase.detalle_solicitud).length <= 45
                        ? reclamoClase.detalle_solicitud
                        : `${(reclamoClase.detalle_solicitud).slice(0,45)}...`
                    }</td>
                    <td>{reclamoClase.fecha_solicitud}</td>
                    <td>
                      <span className='actions'>
                        <Link to={`Solicitud/${reclamoClase.id_solicitud}`} title="Ver" ><BsFillEyeFill /></Link>
                        <Link to={`editarSolicitud/${reclamoClase.id_solicitud}`} title="Editar" ><BsFillPencilFill/></Link>
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
              style={{color: '#007BFF', padding: '10px', border: '2px solid #007BFF', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', display: 'inline-block', width: '100%'}}
            >Cargando datos ...</p></div></div>
        </>}
        {/* <p>Finalizado Elemento 1: {datosS.length?`${datosS.length} y ${datosS[0].id_cliente}`: `${datosS.length}`}</p> */}
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
  
  export default TablaSolicitud