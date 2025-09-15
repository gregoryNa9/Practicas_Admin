import React from 'react';
import './style.css';

function ListaInvitados({ onNavigate }) {
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
        <div className="mb-2">
          <button 
            className="btn btn-link p-0 text-decoration-none"
            style={{ color: '#043474', fontSize: '1rem' }}
            onClick={() => onNavigate('eventos')}
          >
            <i className="fa-solid fa-arrow-left me-2"></i>Volver
          </button>
        </div>
        <h1 className="page-title">Selección de Invitados</h1>
        <h5 className="text-primary">Evento Tsáchila Economic Forum (TEF)</h5>

        {/* Filtros */}
        <div className="bg-white rounded shadow-sm p-3 mb-3">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-auto">
              <button className="btn btn-primary active w-100">Filtros</button>
            </div>
          </div>
          <div className="row g-2 mt-1">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="form-label fw-semibold mb-1">Cédula:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="form-label fw-semibold mb-1">Apellido:</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="row g-2 mt-2">
            <div className="col-12 col-md-6 col-lg-6 d-grid">
              <button className="btn" style={{ backgroundColor: '#043474', color: 'white' }}>
                <i className="fa-solid fa-magnifying-glass me-2"></i>Buscar
              </button>
            </div>
            <div className="col-12 col-md-6 col-lg-6 d-grid">
              <button className="btn btn-light" style={{ border: '1px solid #dee2e6' }}>Limpiar</button>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="stats-card equal-card">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="table-events-header">
                <tr>
                  <th>LISTA DE USUARIOS</th>
                  <th>CELULAR</th>
                  <th>CORREO</th>
                  <th>EMPRESA</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nombre: 'JUAN ALAN PEREZ ZAMBRANO', celular: '0999999999', correo: 'juanperez@gmail.com', empresa: 'PRONACA' },
                  { nombre: 'ANA LUCIA RODRIGUEZ ESPINOZA', celular: '0852852852', correo: 'analu_rodri@outlook.com', empresa: 'PRONACA' },
                  { nombre: 'ANTHONY GEOVANNY MEJIA GAIBOR', celular: '0789789789', correo: 'ant_mejia@hotmail.com', empresa: 'POLACA' },
                  { nombre: 'RONALD JOSUE PURUNCJAIS GONZALEZ', celular: '0456456456', correo: 'ron_puruncjais@hotmail.com', empresa: 'POLACA' }
                ].map((u, idx) => (
                  <tr key={idx}>
                    <td>{u.nombre}</td>
                    <td>{u.celular}</td>
                    <td><a href={`mailto:${u.correo}`}>{u.correo}</a></td>
                    <td>{u.empresa}</td>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="form-check-label ms-2">Invitar</label>
                      </div>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td colSpan="5">&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Acciones inferiores */}
        <div className="row mt-3 g-2 align-items-center">
          <div className="col-12 col-md-6">
            <button className="btn w-100 w-md-auto" style={{ backgroundColor: '#043474', color: 'white' }}>
              <i className="fa-solid fa-user-plus me-2"></i>Agregar nuevo usuario
            </button>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex gap-2 justify-content-md-end">
              <button className="btn" style={{ backgroundColor: '#043474', color: 'white' }}>
                <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
              </button>
              <button className="btn btn-light" style={{ border: '1px solid #dee2e6' }}>Cancelar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ListaInvitados;


