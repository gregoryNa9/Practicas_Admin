import React, { useState, useEffect } from 'react';
import './style.css';

function Historial({ onNavigate }) {
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

  // Estados
  const [filtros, setFiltros] = useState({
    tipoEvento: '',
    fechaEvento: ''
  });
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Tipos de evento
  const tiposEvento = ['Macroevento', 'Adicional', 'Especial'];

  // Carga inicial de historial
  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        setLoading(true);
        setError('');

        let dataHistorial = [];
        try {
          const res = await fetch(`${API_BASE}/historial`);
          if (res.ok) {
            dataHistorial = await res.json();
          }
        } catch {}

        // Datos de respaldo (igual a la imagen)
        if (!dataHistorial || dataHistorial.length === 0) {
          dataHistorial = [
            { id: 1, nombre: 'Tsáchila Economic Forum (TEF)', categoria: 'Macroevento', fecha: '10/08/2025' },
            { id: 2, nombre: 'Tsáchila Economic Forum (TEF)', categoria: 'Macroevento', fecha: '10/08/2025' },
            { id: 3, nombre: 'Seminarios y Capacitaciones', categoria: 'Adicional', fecha: '10/08/2025' },
            { id: 4, nombre: 'Eventos Cooperativos', categoria: 'Adicional', fecha: '10/08/2025' },
            { id: 5, nombre: 'Tsáchila Economic Forum (TEF)', categoria: 'Macroevento', fecha: '10/08/2024' }
          ];
        }

        if (!cancel) setHistorial(dataHistorial);
      } catch (e) {
        if (!cancel) setError('No se pudo cargar la información.');
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    load();
    return () => {
      cancel = true;
    };
  }, [API_BASE]);

  // Funciones de filtro
  const handleInputChange = e => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    // Aquí podrías conectar con backend usando filtros
  };

  const handleLimpiar = () => {
    setFiltros({ tipoEvento: '', fechaEvento: '' });
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
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
              <button className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('eventos')}>
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
              <button className="nav-link active sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('reportes')}>
                <i className="fa-solid fa-file me-2"></i>Reportes
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

      {/* Contenido principal */}
      <main className="flex-grow-1 p-5">
        <h2 className="text-primary fw-bold mb-3">Historial</h2>
        <h5 className="text-muted mb-4">Historial de Ana Lucia Rodriguez Espinoza</h5>

        {/* Filtros */}
        <div className="bg-white rounded shadow-sm p-3 mb-4">
          <div className="row g-2 align-items-end">
            <div className="col-auto">
              <button className="btn btn-primary active">Filtros</button>
            </div>
            <div className="col-md-3">
              <label className="form-label">Tipo de evento:</label>
              <select className="form-select" name="tipoEvento" value={filtros.tipoEvento} onChange={handleInputChange}>
                <option value="">Seleccionar tipo</option>
                {tiposEvento.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Fecha del evento:</label>
              <input
                type="text"
                className="form-control"
                placeholder="dd/mm/aaaa"
                name="fechaEvento"
                value={filtros.fechaEvento}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-auto d-flex gap-2">
              <button className="btn btn-primary" onClick={handleBuscar}>
                <i className="fa-solid fa-magnifying-glass me-1"></i>Buscar
              </button>
              <button className="btn btn-outline-secondary" onClick={handleLimpiar}>
                <i className="fa-solid fa-eraser me-1"></i>Limpiar
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
        </div>

        {/* Tabla de historial */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-events-header">
                  <tr>
                    <th className="text-white border-0">EVENTO</th>
                    <th className="text-white border-0">CATEGORIA</th>
                    <th className="text-white border-0">FECHA</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan="3" className="text-center py-4">Cargando...</td></tr>
                  )}
                  {!loading && historial.map(item => (
                    <tr key={item.id}>
                      <td className="border-0">{item.nombre}</td>
                      <td className="border-0">{item.categoria}</td>
                      <td className="border-0">{item.fecha}</td>
                    </tr>
                  ))}
                  {/* Filas vacías para mantener la estética */}
                  {!loading && historial.length < 6 && (
                    Array.from({ length: 6 - historial.length }).map((_, index) => (
                      <tr key={`empty-${index}`}>
                        <td className="border-0">&nbsp;</td>
                        <td className="border-0">&nbsp;</td>
                        <td className="border-0">&nbsp;</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Historial;
