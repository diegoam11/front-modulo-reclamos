import { useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './formRQS.css'

// Elementos
import InputSelect from '../elements/InputSelect';


//Formularios Clientes
import FormClienteNatural from '../formularioCliente/FormClienteNatural';
import FormEmpresa from '../formularioCliente/FormEmpresa';

//Formulario Datos Comunes RQS
import FormDatosComunes from './FormDatosComunes';
//Formulario RQS
import FormSolicitud from './FormSolicitud';
import FormQueja from './FormQueja';
import FormReclamo from './FormReclamos';// Terminado

import FormSeleccionarRQS from './FormSeleccionarRQS';
import Modal from '../elements/Modal';

const FormRQS = ({modalVisible, closeModal, processing, errorMessage, user, users, setElement, handleSubmitFormulario, tipoRecl, setTipoRecl, fechaRecl, setFechaRecl, formaRespRecl, setFormaRespRecl, tipoBienContratadoRecl, setTipoBienContratadoRecl, fechaCompraRecl, setFechaCompraRecl, numeroPedidoRec, setNumeroPedidoRec, codigoProductoRec, setCodigoProductoRec, detalleRecl, setdetalleRecl, montoRecl, setMontoRecl, peticionClienteRecl, setPeticionClienteRecl, fechaQuej, setFormaRespQuej, setTipoBienContratadoQuej, fechaCompraQuej, setFechaCompraQuej, numeroPedidoQuej, setNumeroPedidoQuej, codigoProductoQuej, setCodigoProductoQuej, detalleQuej, setDetalleQuej, peticionClienteQuej, setPeticionClienteQuej, estadoSolic,setEstadoSolic,tipoSolic,setTipoSolic,fechaSolic,setFechaSolic,formaRespSolic,setFormaRespSolic,tipoBienContratadoSolic,setTipoBienContratadoSolic,numeroPedidoSolic,setNumeroPedidoSolic,codigoProductoSolic,setCodigoProductoSolic,detalleSolic,setDetalleSolic,peticionClienteSolic,setPeticionClienteSolic}) => {
  
  //estadoSolic Solicitudes
  //setPeticionClienteRecl RECLAMOS
  //setPeticionClienteQuej QUEJAS
  // Datos Cliente Natural
  const [clienteNaturalNombre, setClienteNaturalNombre] = useState(null)


  // Datos Cliente Empresa
  const [clienteEmpresaNombre, setClienteEmpresaNombre] = useState(null)
  
  // Dato del tipo de cliente
  const [tipoDeCliente, setTipoDeCliente] = useState(null)
  

  const [tipoFormulario, setTipoFormulario] = useState('')

  // Variable para elegir registrar una R Q o S
  let formularioRQS;

  const history = useHistory()

  // Segun se elige registrar un R Q o S se desplegara el componente R Q o S
  switch (tipoFormulario) {
    case 'Solicitud':
      formularioRQS = 
      <FormSolicitud
        user={user}
        estadoSolic={estadoSolic}//Solicitudes
        setEstadoSolic={setEstadoSolic}
        tipoSolic={tipoSolic}
        setTipoSolic={setTipoSolic}
        fechaSolic={fechaSolic}
        setFechaSolic={setFechaSolic}
        formaRespSolic={formaRespSolic}
        setFormaRespSolic={setFormaRespSolic}
        tipoBienContratadoSolic={tipoBienContratadoSolic}
        setTipoBienContratadoSolic={setTipoBienContratadoSolic}
        numeroPedidoSolic={numeroPedidoSolic}
        setNumeroPedidoSolic={setNumeroPedidoSolic}
        codigoProductoSolic={codigoProductoSolic}
        setCodigoProductoSolic={setCodigoProductoSolic}
        detalleSolic={detalleSolic}
        setDetalleSolic={setDetalleSolic}
        peticionClienteSolic={peticionClienteSolic}
        setPeticionClienteSolic={setPeticionClienteSolic}
      />;
      break;
    case 'Reclamo':
      formularioRQS = 
      <FormReclamo
        user={user}
        tipoRecl={tipoRecl}// Datos
        setTipoRecl={setTipoRecl}
        fechaRecl={fechaRecl}
        setFechaRecl={setFechaRecl}
        formaRespRecl={formaRespRecl}
        setFormaRespRecl={setFormaRespRecl}
        tipoBienContratadoRecl={tipoBienContratadoRecl}
        setTipoBienContratadoRecl={setTipoBienContratadoRecl}
        fechaCompraRecl={fechaCompraRecl}
        setFechaCompraRecl={setFechaCompraRecl}
        numeroPedidoRec={numeroPedidoRec}
        setNumeroPedidoRec={setNumeroPedidoRec}
        codigoProductoRec={codigoProductoRec}
        setCodigoProductoRec={setCodigoProductoRec}
        detalleRecl={detalleRecl}
        setdetalleRecl={setdetalleRecl}
        montoRecl={montoRecl}
        setMontoRecl={setMontoRecl}
        peticionClienteRecl={peticionClienteRecl}
        setPeticionClienteRecl={setPeticionClienteRecl}
      />;
      break;
    case 'Queja':
      formularioRQS = 
      <FormQueja 
      user={user}
      fechaQuej={fechaQuej}
      setFormaRespQuej={setFormaRespQuej}
      setTipoBienContratadoQuej={setTipoBienContratadoQuej}
      fechaCompraQuej={fechaCompraQuej}
      setFechaCompraQuej={setFechaCompraQuej}
      numeroPedidoQuej={numeroPedidoQuej}
      setNumeroPedidoQuej={setNumeroPedidoQuej}
      codigoProductoQuej={codigoProductoQuej}
      setCodigoProductoQuej={setCodigoProductoQuej}
      detalleQuej={detalleQuej}
      setDetalleQuej={setDetalleQuej}
      peticionClienteQuej={peticionClienteQuej}
      setPeticionClienteQuej={setPeticionClienteQuej}
      />;
      break;
    default:
      formularioRQS = null;
  }

  
  return (
    <main className="Form">
      <form onSubmit={(e) => handleSubmitFormulario(tipoFormulario, e)}>

        <h1>Formulario</h1>
          {/* Unicamente una persona natural puede registrar un reclamo */}
          <>
            <FormClienteNatural 
              user={user}
              users={users}
              setElement={setElement}
            />
          </>
          {/* Seleccionar Registrar Reclamo Queja o Solicitud */}
        <FormSeleccionarRQS tipoFormulario={tipoFormulario} setTipoFormulario={setTipoFormulario} />
        
        {/* Formulario de registro Seleccionado de Reclamo Queja o Solicitud */}
        {formularioRQS}

        <div className='FormBotones'>
          {/* Boton para confirmar el registro */}
          <button className='buttonSolicitud' type="submit"
            disabled={tipoFormulario === ""? true: false}
          >Confirmar</button>
          <button
          className='buttonCancelar'
          onClick={() => {
            history.push('/')
          }}
          >Cancelar</button>
        </div>
      </form>
      <Modal 
      showModal={modalVisible} 
      closeModal={closeModal}
      processing={processing}
      errorMessage={errorMessage}
      redireccion={""}
      />
    </main>
  );
};

export default FormRQS;