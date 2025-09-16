import React from 'react';
import './style.css';
import Menu from './Menu';

function ListaInvitados({ onNavigate }) {
  return (
    <div className="d-flex min-vh-100 lista-invitados-container">
      {/* Sidebar */}
      <Menu onNavigate={onNavigate} activeItem="eventos" />

      {/* Main Content */}
      <main className="flex-grow-1 p-5">
        <div className="mb-2">
          <button className="lista-invitados-back-button" onClick={() => onNavigate('eventos')}>
            <i className="fa-solid fa-arrow-left me-2"></i>Volver
          </button>
        </div>
        <h1 className="lista-invitados-title">Selección de Invitados</h1>
        <h5 className="lista-invitados-subtitle">Evento Tsáchila Economic Forum (TEF)</h5>

        {/* Filtros */}
        <div className="lista-invitados-filters">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-auto">
              <div className="mb-2 fw-bold text-info">Filtros</div>
            </div>
          </div>
          <div className="row g-2 mt-1">
            <div className="col-12 col-md-6 col-lg-6">
              <label className="lista-invitados-filter-label">Cédula:</label>
              <input type="text" className="form-control lista-invitados-filter-input" />
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <label className="lista-invitados-filter-label">Apellido:</label>
              <input type="text" className="form-control lista-invitados-filter-input" />
            </div>
          </div>
          <div className="row g-2 mt-2">
            <div className="col-12 col-md-6 col-lg-6 d-grid">
              <button className="lista-invitados-btn-primary">
                <i className="fa-solid fa-magnifying-glass me-2"></i>Buscar
              </button>
            </div>
            <div className="col-12 col-md-6 col-lg-6 d-grid">
              <button className="lista-invitados-btn-secondary">Limpiar</button>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="lista-invitados-table-container">
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
                      <div className="lista-invitados-checkbox-container">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                        <label className="lista-invitados-checkbox-label">Invitar</label>
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
        <div className="row lista-invitados-actions g-2 align-items-center">
          <div className="col-12 col-md-6">
            <button className="lista-invitados-btn-primary" onClick={() => onNavigate('new-user')}>
              <i className="fa-solid fa-user-plus me-2"></i>Agregar nuevo usuario
            </button>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex gap-2 justify-content-md-end">
              <button className="lista-invitados-btn-primary">
                <i className="fa-solid fa-floppy-disk me-2"></i>Guardar
              </button>
              <button className="lista-invitados-btn-secondary ">Cancelar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ListaInvitados;


