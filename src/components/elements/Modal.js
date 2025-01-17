import React from 'react';
import { useHistory } from 'react-router-dom'
import './Modal.css';

const Modal = ({ showModal, closeModal, processing, errorMessage,  redireccion}) => {
  
  const history = useHistory();

  const salirModal = () => {
    if(errorMessage !== ''){
      //Hay error
      //Opciona a cerrar el cuadro y reintentar
      closeModal();
    } else {
      //Si no hay error finalizamos el registro
      closeModal();
      history.push(`/${redireccion}`);
    }
  };

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={salirModal}>&times;</span>
        {processing ? (
          <p>Procesando...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <p>¡La acción se procesó con éxito!</p>
        )}
        <button className='modal-boton' onClick={salirModal} disabled={processing}>Aceptar</button>
      </div>
    </div>
  );
};

export default Modal;
