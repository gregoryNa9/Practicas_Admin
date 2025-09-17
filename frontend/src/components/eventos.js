import React, { useState, useEffect } from 'react';
import './style.css';
import Menu from './Menu';
import { Modal, Button } from 'react-bootstrap';

function Eventos({ onNavigate }) {
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

  // Estados para filtros y datos
  const [filtros, setFiltros] = useState({
    tipoEvento: '',
    fechaEvento: ''
  });
  const [eventos, setEventos] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    eventoActivo: 'Tsáchila Economic Forum (TEF)',
    totalInvitados: '#total_invitados',
    totalConfirmados: '#total_confirmados'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estados para modales
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Tipos de evento disponibles
  const tiposEvento = ['Macroevento', 'Adicional', 'Especial'];

  // Carga inicial desde el backend
  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        setLoading(true);
        setError('');
        
        let dataEventos = [];
        try {
          const resEventos = await fetch(`${API_BASE}/eventos`);
          if (resEventos.ok) {
            dataEventos = await resEventos.json();
          }
        } catch {}

        try {
          const resStats = await fetch(`${API_BASE}/eventos/stats`);
          if (resStats.ok) {
            const dataStats = await resStats.json();
            if (!cancel) setEstadisticas(dataStats);
          }
        } catch {}

        if (!dataEventos || dataEventos.length === 0) {
          dataEventos = [
            {
              id: 1,
              nombre: 'Tsáchila Economic Forum (TEF)',
              categoria: 'Macroevento',
              temaEvento: 'Innovación 2025',
              temaConferencia: 'Transformación digital',
              fecha: '2025-09-20',
              lugar: 'Centro de Convenciones',
              horaInicio: '09:00',
              horaFin: '18:00',
              codigoVestimenta: 'Formal',
              organizadoPor: 'PrimeNet',
              estado: 'Activo',
              fechaCreacion: '10/08/2025'
            },
            {
              id: 2,
              nombre: 'Seminarios y Capacitaciones',
              categoria: 'Adicional',
              temaEvento: 'Educación Continua',
              temaConferencia: 'Nuevas herramientas de gestión',
              fecha: '2025-10-05',
              lugar: 'Parque Empresarial',
              horaInicio: '10:00',
              horaFin: '16:00',
              codigoVestimenta: 'Casual',
              organizadoPor: 'Cámara de Comercio',
              estado: 'Inactivo',
              fechaCreacion: '15/08/2025'
            }
          ];
        }
        if (!cancel) setEventos(dataEventos);
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

  // Filtros
  const handleInputChange = e => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    console.log("Buscar con filtros", filtros);
  };

  const handleLimpiar = () => {
    setFiltros({ tipoEvento: '', fechaEvento: '' });
  };

  // Clases para estado
  const getEstadoBadgeClass = (estado) => {
    switch ((estado || '').toLowerCase()) {
      case 'activo':
        return 'badge badge-activo';
      case 'inactivo':
        return 'badge badge-inactivo';
      default:
        return 'badge bg-secondary';
    }
  };

  // Funciones para abrir modales
  const handleView = (evento) => {
    setEventoSeleccionado(evento);
    setShowViewModal(true);
  };

  const handleEdit = (evento) => {
    setEventoSeleccionado({ ...evento });
    setShowEditModal(true);
  };

  const handleDelete = (evento) => {
    setEventoSeleccionado(evento);
    setShowDeleteModal(true);
  };

  // Guardar cambios de edición
  const guardarCambios = () => {
    setEventos(eventos.map(e => e.id === eventoSeleccionado.id ? eventoSeleccionado : e));
    setShowEditModal(false);
    alert('Evento actualizado correctamente');
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    setEventos(eventos.filter(e => e.id !== eventoSeleccionado.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Menu onNavigate={onNavigate} activeItem="eventos" />

      <main className="flex-grow-1 p-5">
        <h2 className="text-primary fw-bold mb-3">Eventos</h2>

        {/* Filtros */}
        <div className="bg-white rounded shadow-sm p-3 mb-4">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-auto">
              <button className="btn btn-primary active w-100">Filtros</button>
            </div>
          </div>
          <div className="row g-2 mt-1">
            <div className="col-12 col-md-6">
              <label className="form-label">Tipo de evento:</label>
              <select className="form-select" name="tipoEvento" value={filtros.tipoEvento} onChange={handleInputChange}>
                <option value="">Seleccionar tipo</option>
                {tiposEvento.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Fecha del evento:</label>
              <input type="text" className="form-control" placeholder="dd/mm/aaaa" name="fechaEvento" value={filtros.fechaEvento} onChange={handleInputChange} />
            </div>
          </div>
          <div className="row g-2 mt-2">
            <div className="col-12 col-md-4 d-grid">
              <button className="btn btn-primary w-100" onClick={handleBuscar}>
                <i className="fa-solid fa-magnifying-glass me-1"></i>Buscar
              </button>
            </div>
            <div className="col-12 col-md-4 d-grid">
              <button className="btn btn-outline-secondary w-100" onClick={handleLimpiar}>
                <i className="fa-solid fa-eraser me-1"></i>Limpiar
              </button>
            </div>
            <div className="col-12 col-md-4 d-grid">
              <button className="btn btn-primary w-100" onClick={() => onNavigate('new-evento')}>
                <i className="fa-solid fa-plus me-1"></i>Nuevo
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
        </div>

        {/* Tabla de eventos */}
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0 text-center">
                <thead className="table-events-header">
                  <tr>
                    <th className="text-white border-0">EVENTO</th>
                    <th className="text-white border-0">CATEGORÍA</th>
                    <th className="text-white border-0">ESTADO</th>
                    <th className="text-white border-0">FECHA CREACIÓN</th>
                    <th className="text-white border-0">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan="5" className="text-center py-4">Cargando...</td></tr>
                  )}
                  {!loading && eventos.map(evento => (
                    <tr key={evento.id}>
                      <td className="border-0">{evento.nombre}</td>
                      <td className="border-0">{evento.categoria}</td>
                      <td className="border-0">
                        <span className={getEstadoBadgeClass(evento.estado)}>{evento.estado}</span>
                      </td>
                      <td className="border-0">{evento.fechaCreacion}</td>
                      <td className="border-0">
                        <div className="btn-group" role="group">
                          <button className="btn btn-link text-primary btn-action" title="Ver" onClick={() => handleView(evento)}>
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button className="btn btn-link text-primary btn-action" title="Editar" onClick={() => handleEdit(evento)}>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button className="btn btn-link btn-action-danger" title="Eliminar" onClick={() => handleDelete(evento)}>
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Ver Detalles */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {eventoSeleccionado && (
            <div>
              <p><strong>Nombre:</strong> {eventoSeleccionado.nombre}</p>
              <p><strong>Categoría:</strong> {eventoSeleccionado.categoria}</p>
              <p><strong>Tema del Evento:</strong> {eventoSeleccionado.temaEvento}</p>
              <p><strong>Tema de la Conferencia:</strong> {eventoSeleccionado.temaConferencia}</p>
              <p><strong>Fecha:</strong> {eventoSeleccionado.fecha}</p>
              <p><strong>Lugar:</strong> {eventoSeleccionado.lugar}</p>
              <p><strong>Hora Inicio:</strong> {eventoSeleccionado.horaInicio}</p>
              <p><strong>Hora Fin:</strong> {eventoSeleccionado.horaFin}</p>
              <p><strong>Código Vestimenta:</strong> {eventoSeleccionado.codigoVestimenta}</p>
              <p><strong>Organizado Por:</strong> {eventoSeleccionado.organizadoPor}</p>
              <p><strong>Estado:</strong> {eventoSeleccionado.estado}</p>
              <p><strong>Fecha de Creación:</strong> {eventoSeleccionado.fechaCreacion}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Editar Evento */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {eventoSeleccionado && (
            <form>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventoSeleccionado.nombre}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, nombre: e.target.value })}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    value={eventoSeleccionado.categoria}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, categoria: e.target.value })}
                  >
                    {tiposEvento.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Tema del Evento</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventoSeleccionado.temaEvento}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, temaEvento: e.target.value })}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Tema de la Conferencia</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventoSeleccionado.temaConferencia}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, temaConferencia: e.target.value })}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    value={eventoSeleccionado.fecha}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, fecha: e.target.value })}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Lugar</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventoSeleccionado.lugar}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, lugar: e.target.value })}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Hora Inicio</label>
                  <input
                    type="time"
                    className="form-control"
                    value={eventoSeleccionado.horaInicio}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, horaInicio: e.target.value })}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Hora Fin</label>
                  <input
                    type="time"
                    className="form-control"
                    value={eventoSeleccionado.horaFin}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, horaFin: e.target.value })}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Código de Vestimenta</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventoSeleccionado.codigoVestimenta}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, codigoVestimenta: e.target.value })}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Organizado Por</label>
                  <input
                    type="text"
                    className="form-control"
                    value={eventoSeleccionado.organizadoPor}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, organizadoPor: e.target.value })}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Estado</label>
                  <select
                    className="form-select"
                    value={eventoSeleccionado.estado}
                    onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, estado: e.target.value })}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={guardarCambios}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {eventoSeleccionado && (
            <p>¿Seguro que deseas eliminar el evento <strong>{eventoSeleccionado.nombre}</strong>?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Eventos;
