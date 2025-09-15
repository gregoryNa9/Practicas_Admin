import React, { useState } from 'react';
import './style.css';

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
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#e3f2fd' }}>
      {/* Sidebar */}
			<aside className="sidebar">
        		<div className="text-center mb-4">
					<img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
				</div>
				<nav>
					<ul className="nav flex-column">
						<li className="nav-item mb-2">
							<button className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('dashboard')}>
								<i className="fa-solid fa-house me-2"></i>Dashboard
							</button>
						</li>
						<li className="nav-item mb-2">
							<button className="nav-link active sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('eventos')}>
								<i className="fa-solid fa-calendar-days me-2"></i>Eventos
							</button>
						</li>
						<li className="nav-item mb-2">
							<button className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('invitaciones')}>
								<i className="fa-solid fa-envelope me-2"></i>Invitaciones
							</button>
						</li>
						<li className="nav-item mb-2">
							<button className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('confirmaciones')}>
								<i className="fa-solid fa-check me-2"></i>Confirmaciones
							</button>
						</li>
						<li className="nav-item mb-2">
							<button className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('reportes')}>
								<i className="fa-solid fa-file me-2"></i>Reportes
							</button>
						</li>
						<li className="nav-item mb-2">
							<button className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('new-user')}>
								<i className="fa-solid fa-user-plus me-2"></i>Nuevo Usuario
							</button>
						</li>
						<li className="nav-item mt-4">
							<button className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('login')}>
								<i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Salir
							</button>
						</li>
					</ul>
				</nav>
			</aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-5">
        {/* Header */}
        <div className="mb-4">
          <h1 className="page-title mb-2">Nuevo Evento</h1>
          <button 
            className="btn btn-link p-0 text-decoration-none"
            style={{ color: '#043474', fontSize: '1rem' }}
            onClick={() => onNavigate('eventos')}
          >
            <i className="fa-solid fa-arrow-left me-2"></i>← Volver
          </button>
        </div>

        {/* Form */}
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <form>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Nombre del evento:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombreEvento"
                      value={formData.nombreEvento}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Categoría:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Tema del evento:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="temaEvento"
                      value={formData.temaEvento}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Tema de conferencia:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="temaConferencia"
                      value={formData.temaConferencia}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Fecha:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Lugar:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lugar"
                      value={formData.lugar}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Hora de ingreso:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="horaIngreso"
                      value={formData.horaIngreso}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Hora de inicio:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="horaInicio"
                      value={formData.horaInicio}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Código de vestimenta:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="codigoVestimenta"
                      value={formData.codigoVestimenta}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ color: '#043474' }}>
                      Organizado por:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="organizadoPor"
                      value={formData.organizadoPor}
                      onChange={handleInputChange}
                      style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row mt-4 g-2">
          <div className="col-12 col-md-3 d-grid">
            <button 
              className="btn d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#043474', color: 'white' }}
              onClick={() => onNavigate('form-registro')}
            >
              <i className="fa-solid fa-pen me-2"></i>Editar Formulario de Registro
            </button>
          </div>
          <div className="col-12 col-md-3 d-grid">
            <button 
              className="btn d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#043474', color: 'white' }}
              onClick={() => onNavigate('lista-invitados')}
            >
              <i className="fa-solid fa-clipboard-list me-2"></i>Lista de usuarios a invitar
            </button>
          </div>
          <div className="col-12 col-md-3 d-grid">
            <button 
              className="btn d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#043474', color: 'white' }}
              onClick={handleGuardar}
            >
              <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
            </button>
          </div>
          <div className="col-12 col-md-3 d-grid">
            <button 
              className="btn d-flex align-items-center justify-content-center"
              style={{ backgroundColor: 'white', color: '#6c757d', border: '1px solid #dee2e6' }}
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

