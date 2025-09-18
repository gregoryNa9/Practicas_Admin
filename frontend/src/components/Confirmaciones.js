import React, { useState, useEffect } from 'react';
import './style.css';
import Menu from './Menu';
import { Modal, Button, Form } from 'react-bootstrap';

function Confirmaciones({ onNavigate }) {
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

  // Estados para filtros y datos
  const [filtros, setFiltros] = useState({
    tipoEvento: '',
    fechaEvento: ''
  });
  const [confirmaciones, setConfirmaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Estados para modales
  const [showVerMas, setShowVerMas] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  const tiposEvento = ['Tsáchila Economic Forum (TEF)', 'Seminarios y Capacitaciones', 'Eventos Cooperativos'];

  // Cargar datos iniciales
  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        setLoading(true);
        setError('');

        let dataConfirmaciones = [];
        try {
          const resConfirmaciones = await fetch(`${API_BASE}/confirmaciones`);
          if (resConfirmaciones.ok) {
            dataConfirmaciones = await resConfirmaciones.json();
          }
        } catch {}

        // Datos de respaldo si no hay datos en backend
        if (!dataConfirmaciones || dataConfirmaciones.length === 0) {
          dataConfirmaciones = [
            { id: 1, invitado: 'JUAN ALAN PEREZ ZAMBRANO', evento: 'Tsáchila Economic Forum (TEF)', estado: 'Confirmado', fecha: '10/08/2025' },
            { id: 2, invitado: 'ANA LUCIA RODRIGUEZ ESPINOZA', evento: 'Tsáchila Economic Forum (TEF)', estado: 'Pendiente', fecha: '10/08/2025' },
            { id: 3, invitado: 'ANTHONY GEOVANNY MEJIA GAIBOR', evento: 'Seminarios y Capacitaciones', estado: 'Pendiente', fecha: '10/08/2025' },
            { id: 4, invitado: 'RONALD JOSUE PURUNCAJAS GONZALEZ', evento: 'Eventos Cooperativos', estado: 'Confirmado', fecha: '10/08/2025' }
          ];
        }
        if (!cancel) setConfirmaciones(dataConfirmaciones);
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

  // Funciones para filtros
  const handleInputChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = () => {
    // Implementar búsqueda en backend o filtrado en memoria
  };

  const handleLimpiar = () => {
    setFiltros({ tipoEvento: '', fechaEvento: '' });
  };

  // Manejo de estados de modal
  const handleVerMas = (evento) => {
    setSelectedEvento(evento);
    setShowVerMas(true);
  };

  const handleCloseVerMas = () => {
    setShowVerMas(false);
    setSelectedEvento(null);
  };

  const handleEditar = () => {
    setShowVerMas(false);
    setShowEditar(true);
  };

  const handleCloseEditar = () => {
    setShowEditar(false);
    setSelectedEvento(null);
  };

  const handleGuardarCambios = () => {
    console.log('Guardando cambios', selectedEvento);
    setShowEditar(false);
  };

  // Manejo de cambios en el formulario de edición
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvento({ ...selectedEvento, [name]: value });
  };

  // Estilos para badges
  const getEstadoBadgeClass = (estado) => {
    switch ((estado || '').toLowerCase()) {
      case 'confirmado':
        return 'badge badge-confirmado';
      case 'pendiente':
        return 'badge badge-pendiente';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <Menu onNavigate={onNavigate} activeItem="confirmaciones" />

      {/* Contenido principal */}
      <main className="flex-grow-1 p-5">
        <h2 className="text-primary fw-bold mb-3">Confirmaciones</h2>

        {/* Filtros */}
        <div className="bg-white rounded shadow-sm p-3 mb-4">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-auto">
              <div className="mb-2 fw-bold text-info">Filtros</div>
            </div>
          </div>
          <div className="row g-2 mt-1">
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Tipo de evento:</label>
              <select className="form-select" name="tipoEvento" value={filtros.tipoEvento} onChange={handleInputChange}>
                <option value="">Seleccionar tipo</option>
                {tiposEvento.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Fecha del evento:</label>
              <input type="text" className="form-control" placeholder="dd/mm/aaaa" name="fechaEvento" value={filtros.fechaEvento} onChange={handleInputChange} />
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
        </div>

        {/* Tabla de confirmaciones */}
        <div className="stats-card equal-card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-events-header">
                  <tr>
                    <th className="text-white border-0">INVITADO</th>
                    <th className="text-white border-0">EVENTO</th>
                    <th className="text-white border-0">ESTADO</th>
                    <th className="text-white border-0">FECHA</th>
                    <th className="text-white border-0">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan="5" className="text-center py-4">Cargando...</td></tr>
                  )}
                  {!loading && confirmaciones.map(confirmacion => (
                    <tr key={confirmacion.id}>
                      <td className="border-0">{confirmacion.invitado}</td>
                      <td className="border-0">{confirmacion.evento}</td>
                      <td className="border-0">
                        <span className={getEstadoBadgeClass(confirmacion.estado)}>{confirmacion.estado}</span>
                      </td>
                      <td className="border-0">{confirmacion.fecha}</td>
                      <td className="border-0">
                        <button
                          className="btn btn-link text-primary btn-ver-mas"
                          onClick={() => handleVerMas(confirmacion)}
                        >
                          <i className="fa-solid fa-eye me-1"></i>Ver más
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Ver Más */}
      <Modal show={showVerMas} onHide={handleCloseVerMas}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvento && (
            <div>
              <p><strong>Invitado:</strong> {selectedEvento.invitado}</p>
              <p><strong>Evento:</strong> {selectedEvento.evento}</p>
              <p><strong>Estado:</strong> {selectedEvento.estado}</p>
              <p><strong>Fecha:</strong> {selectedEvento.fecha}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVerMas}>Cerrar</Button>
          <Button variant="primary" onClick={handleEditar}>Editar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Editar */}
      <Modal show={showEditar} onHide={handleCloseEditar}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvento && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Invitado</Form.Label>
                <Form.Control
                  type="text"
                  name="invitado"
                  value={selectedEvento.invitado}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Evento</Form.Label>
                <Form.Control
                  type="text"
                  name="evento"
                  value={selectedEvento.evento}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={selectedEvento.estado}
                  onChange={handleEditChange}
                >
                  <option value="Confirmado">Confirmado</option>
                  <option value="Pendiente">Pendiente</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="text"
                  name="fecha"
                  value={selectedEvento.fecha}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditar}>Cancelar</Button>
          <Button variant="success" onClick={handleGuardarCambios}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Confirmaciones;
