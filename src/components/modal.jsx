import React from 'react';
import Modal from 'react-modal';

const CandidatoModal = ({ isOpen, onRequestClose, candidato }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      {candidato && (
        <div>
          <h2>{candidato.label}</h2>
          <p>Información: {candidato.informacion}</p>
          <p>Información: {candidato.nombre}</p>
          {/* ...otros campos y detalles del candidato */}
        </div>
      )}
      <button onClick={onRequestClose}>Cerrar</button>
    </Modal>
  );
};

export default CandidatoModal;
