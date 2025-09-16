import React, { useState } from 'react';
import './style.css';
import Menu from './Menu';

function NewEvento({ onNavigate }) {
  const [formData, setFormData] = useState({
    nombreEvento: '',
    categoria: '',
    temaEvento: '',
    temaConferencia: '',
    fecha: '',
    lugar: '',
    horaIngreso: '',
    horaInicio: '',
    codigoVestimenta: '',
    organizadoPor: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = () => {
    // Lógica para guardar el evento
    console.log('Guardando evento:', formData);
  };

  const handleLimpiar = () => {
    setFormData({
      nombreEvento: '',
      categoria: '',
      temaEvento: '',
      temaConferencia: '',
      fecha: '',
      lugar: '',
      horaIngreso: '',
      horaInicio: '',
      codigoVestimenta: '',
      organizadoPor: ''
    });
  };

  return (
    <div className="d-flex min-vh-100 evento-form-container">
		{/* Sidebar */}
		<Menu onNavigate={onNavigate} activeItem="eventos" />

      {/* Main Content */}
      <main className="flex-grow-1 p-5">
        {/* Header */}
        <div className="mb-4">
          <h1 className="page-title mb-2">Nuevo Evento</h1>
          <button 
            className="evento-back-button"
            onClick={() => onNavigate('eventos')}
          >
            <i className="fa-solid fa-arrow-left me-2"></i>← Volver
          </button>
        </div>

        {/* Form */}
        <div className="evento-form-card">
          <div className="card-body p-4">
            <form>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Nombre del evento:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="nombreEvento"
                      value={formData.nombreEvento}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Categoría:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Tema del evento:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="temaEvento"
                      value={formData.temaEvento}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Tema de conferencia:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="temaConferencia"
                      value={formData.temaConferencia}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Fecha:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Lugar:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="lugar"
                      value={formData.lugar}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Hora de ingreso:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="horaIngreso"
                      value={formData.horaIngreso}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Hora de inicio:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="horaInicio"
                      value={formData.horaInicio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Código de vestimenta:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="codigoVestimenta"
                      value={formData.codigoVestimenta}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="evento-form-label">
                      Organizado por:
                    </label>
                    <input
                      type="text"
                      className="form-control evento-form-input"
                      name="organizadoPor"
                      value={formData.organizadoPor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row evento-action-buttons g-2">
          
          <div className="col-12 col-md-6 col-lg-3 d-grid">
            <button 
              className="evento-btn-primary" onClick={() => onNavigate('lista-invitados')} >
              <i className="fa-solid fa-clipboard-list me-2"></i>Lista de usuarios a invitar
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-grid">
            <button 
              className="evento-btn-primary"
              onClick={handleGuardar}
            >
              <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
            </button>
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-grid">
            <button 
              className="evento-btn-secondary"
              onClick={handleLimpiar}
            >
              Limpiar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NewEvento;

