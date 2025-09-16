import React, { useState } from 'react';
import './style.css';
import Menu from './Menu';

function NewUser({ onNavigate }) {
  // Estados para filtros y datos
  const [filtros, setFiltros] = useState({
    cedula: '',
    apellido: ''
  });
  const [error, setError] = useState('');

  // Funciones de filtro y acciones
  const handleInputChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    // Lógica para buscar usuarios
    console.log('Buscando usuarios con filtros:', filtros);
  };

  const handleLimpiar = () => {
    setFiltros({ cedula: '', apellido: '' });
  };
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Menu onNavigate={onNavigate} activeItem="new-user" />

      {/* Main Content */}
      <main className="flex-grow-1 p-5">
        <h1 className="page-title">Nuevo Usuario/Invitado</h1>
        <p className="text-muted mb-3">Formulario de registro de un nuevo usuario que se agregará a la base de datos para ser tomado en cuenta en próximos eventos.</p>

        {/* Filtros superiores */}
        <div className="bg-white rounded shadow-sm p-3 mb-4">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-auto">
              <div className="mb-2 fw-bold text-info">Filtros</div>
            </div>
          </div>
          <div className="row g-2 mt-1">
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Cédula:</label>
              <input 
                type="text" 
                className="form-control" 
                name="cedula"
                value={filtros.cedula}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Apellido:</label>
              <input 
                type="text" 
                className="form-control" 
                name="apellido"
                value={filtros.apellido}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-lg-4 d-grid">
              <button className="btn btn-primary d-none d-lg-block h-70 mb-1" onClick={handleBuscar}>
                <i className="fa-solid fa-magnifying-glass me-1"></i>Buscar
              </button>
              <button className="btn btn-outline-secondary d-none d-lg-block h-70" onClick={handleLimpiar}>
                <i className="fa-solid fa-eraser me-1"></i>Limpiar
              </button>
            </div>
          </div>
          <div className="row g-2 mt-2">
            <div className="col-12 col-md-6 d-grid">
              <button className="btn btn-primary d-none d-sm-block d-lg-none w-100" onClick={handleBuscar}>
                <i className="fa-solid fa-magnifying-glass me-1"></i>Buscar
              </button>
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-grid">
              <button className="btn btn-outline-secondary d-none d-sm-block d-lg-none w-100" onClick={handleLimpiar}>
                <i className="fa-solid fa-eraser me-1"></i>Limpiar
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
        </div>

        {/* Formulario de registro */}
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">NOMBRES:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">APELLIDOS:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">CEDULA:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">CELULAR:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">CORREO:</label>
              <input type="email" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">EMPRESA:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">CARGO:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold">SECTOR:</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="row g-2 mt-3">
            <div className="col-12 col-md-3 d-grid">
              <button className="btn" style={{ backgroundColor: '#043474', color: 'white' }}>
                <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
              </button>
            </div>
            <div className="col-12 col-md-3 d-grid">
              <button className="btn btn-light" style={{ border: '1px solid #dee2e6' }}>Limpiar</button>
            </div>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="stats-card equal-card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-events-header">
                <tr>
                  <th className="text-white border-0">LISTA DE USUARIOS</th>
                  <th className="text-white border-0">CELULAR</th>
                  <th className="text-white border-0">CORREO</th>
                  <th className="text-white border-0">EMPRESA</th>
                  <th className="text-white border-0">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nombre: 'JUAN ALAN PEREZ ZAMBRANO', celular: '0999999999', correo: 'juanperez@gmail.com', empresa: 'PRONACA' },
                  { nombre: 'ANA LUCIA RODRIGUEZ ESPINOZA', celular: '0852852852', correo: 'analu_rodri@outlook.com', empresa: 'PRONACA' },
                  { nombre: 'ANTHONY GEOVANNY MEJIA GAIBOR', celular: '0789789789', correo: 'ant_mejia@hotmail.com', empresa: 'POLACA' },
                  { nombre: 'RONALD JOSUE PURUNCAJAS GONZALEZ', celular: '0456456456', correo: 'ron_puruncjais@hotmail.com', empresa: 'POLACA' }
                ].map((u, idx) => (
                  <tr key={idx}>
                    <td>{u.nombre}</td>
                    <td>{u.celular}</td>
                    <td><a href={`mailto:${u.correo}`}>{u.correo}</a></td>
                    <td>{u.empresa}</td>
                    <td className="text-center">
                      <button className="btn btn-link text-primary"><i className="fa-solid fa-eye"></i></button>
                      <button className="btn btn-link text-primary"><i className="fa-solid fa-pen"></i></button>
                      <button className="btn btn-link text-danger"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td className="border-0" colSpan="5">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NewUser;
