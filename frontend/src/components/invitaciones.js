import React, { useState, useEffect } from 'react';
import './style.css';
import Menu from './Menu';
import 'bootstrap/dist/css/bootstrap.min.css';

function Invitaciones({ onNavigate }) {
	const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

	// Estados
	const [filtros, setFiltros] = useState({ cedula: '', evento: '', estado: '' });
	const [invitaciones, setInvitaciones] = useState([]);
	const [estados, setEstados] = useState([]);
	const [eventos, setEventos] = useState([
		'Tsáchila Economic Forum (TEF)',
		'Seminarios y Capacitaciones',
		'Eventos Cooperativos'
	]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Estados para modal y selección
	const [showModal, setShowModal] = useState(false);
	const [selectedInvitacion, setSelectedInvitacion] = useState(null);

	// Estado para imagen subida
	const [nuevaImagen, setNuevaImagen] = useState(null);

	// Mapea estado a clases CSS
	const getEstadoBadgeClass = (estadoNombre) => {
		switch ((estadoNombre || '').toLowerCase()) {
			case 'confirmado': return 'badge badge-confirmado';
			case 'pendiente': return 'badge badge-pendiente';
			case 'no asistió':
			case 'no asistio': return 'badge badge-inactivo';
			default: return 'badge bg-secondary';
		}
	};

	// Carga inicial
	useEffect(() => {
		let cancel = false;
		async function load() {
			try {
				setLoading(true);
				setError('');
				let dataInv = [];
				try {
					const resInv = await fetch(`${API_BASE}/invitaciones`);
					if (resInv.ok) dataInv = await resInv.json();
				} catch {}
				if (!dataInv || dataInv.length === 0) {
					// Datos de ejemplo con código, QR e imagen
					dataInv = [
						{ id: 1, invitado: 'JUAN ALAN PEREZ ZAMBRANO', evento: 'Tsáchila Economic Forum (TEF)', estado: 'Confirmado', fecha: '10/08/2025', codigo: 'ABC123', qr: '/qr1.png', imagen: '/inv1.jpg' },
						{ id: 2, invitado: 'ANA LUCIA RODRIGUEZ ESPINOZA', evento: 'Tsáchila Economic Forum (TEF)', estado: 'Pendiente', fecha: '10/08/2025', codigo: 'XYZ456', qr: '/qr2.png', imagen: '/inv2.jpg' },
					];
				}
				if (!cancel) setInvitaciones(dataInv);
			} catch {
				if (!cancel) setError('No se pudo cargar la información.');
			} finally {
				if (!cancel) setLoading(false);
			}
		}
		load();
		return () => { cancel = true; };
	}, [API_BASE]);

	// Handlers
	const handleInputChange = e => setFiltros({ ...filtros, [e.target.name]: e.target.value });
	const handleBuscar = () => {};
	const handleLimpiar = () => setFiltros({ cedula: '', evento: '', estado: '' });

	// Abrir modal
	const handleVerMas = (inv) => {
		setSelectedInvitacion(inv);
		setShowModal(true);
	};

	// Subir imagen
	const handleImagenChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setNuevaImagen(URL.createObjectURL(e.target.files[0]));
		}
	};

	return (
		<div className="d-flex min-vh-100 bg-light">
			<Menu onNavigate={onNavigate} activeItem="invitaciones" />
			<main className="flex-grow-1 p-5">
				<h2 className="text-primary fw-bold mb-3">Invitaciones</h2>

				{/* Filtros */}
				<div className="bg-white rounded shadow-sm p-3 mb-4">
					<div className="mb-2 fw-bold text-info">Filtros</div>
					<div className="row g-2 align-items-end">
						<div className="col-12 col-md-6 col-lg-4">
							<label className="form-label">Buscar por cédula:</label>
							<input type="text" className="form-control" name="cedula" value={filtros.cedula} onChange={handleInputChange} />
						</div>
						<div className="col-12 col-md-6 col-lg-4">
							<label className="form-label">Por Evento:</label>
							<select className="form-select" name="evento" value={filtros.evento} onChange={handleInputChange}>
								<option value="">Todos</option>
								{eventos.map(ev => <option key={ev} value={ev}>{ev}</option>)}
							</select>
						</div>
						<div className="col-12 col-md-6 col-lg-4">
							<label className="form-label">Por Estado:</label>
							<select className="form-select" name="estado" value={filtros.estado} onChange={handleInputChange}>
								<option value="">Todos</option>
								{(estados.length ? estados.map(e => e.nombre || e.estado || e) : ['Confirmado', 'Pendiente', 'No asistió']).map(es => (
									<option key={typeof es === 'string' ? es : String(es)} value={typeof es === 'string' ? es : (es.nombre || es.estado)}>
										{typeof es === 'string' ? es : (es.nombre || es.estado)}
									</option>
								))}
							</select>
						</div>
						<div className="col-12">
							<div className="row g-2">
								<div className="col-12 col-md-6 col-lg-3 d-grid">
									<button className="btn btn-primary w-100" onClick={handleBuscar}>
										<i className="fa-solid fa-magnifying-glass me-1"></i>Buscar
									</button>
								</div>
								<div className="col-12 col-md-6 col-lg-3 d-grid">
									<button className="btn btn-secondary w-100" onClick={handleLimpiar}>
										<i className="fa-solid fa-eraser me-1"></i>Limpiar
									</button>
								</div>
								<div className="col-12 col-md-6 col-lg-3 d-grid">
									<label className="btn btn-success w-100">
										<i className="fa-solid fa-plus me-1"></i>Crear nueva invitación
										<input type="file" accept="image/*" hidden onChange={handleImagenChange} />
									</label>
								</div>
								<div className="col-12 col-md-6 col-lg-3 d-grid">
									<button className="btn btn-success w-100" onClick={() => window.open(`${API_BASE}/invitaciones/export`, '_blank') }>
										<i className="fa-solid fa-file-excel me-1"></i>Exportar en Excel
									</button>
								</div>
							</div>
						</div>
					</div>
					{error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
				</div>

				{/* Tabla de invitaciones */}
				<div className="table-container">
					<div className="card-body p-0">
						<div className="table-responsive">
							<table className="table table-hover mb-0 text-center">
								<thead className="table-events-header">
									<tr>
										<th>INVITADO</th>
										<th>EVENTO</th>
										<th>ESTADO</th>
										<th>FECHA</th>
										<th>ACCIONES</th>
									</tr>
								</thead>
								<tbody>
									{loading && <tr><td colSpan="5">Cargando...</td></tr>}
									{!loading && invitaciones.map(inv => (
										<tr key={inv.id}>
											<td>{inv.invitado}</td>
											<td>{inv.evento}</td>
											<td><span className={getEstadoBadgeClass(inv.estado)}>{inv.estado}</span></td>
											<td>{inv.fecha}</td>
											<td>
												<button className="btn btn-link p-0" onClick={() => handleVerMas(inv)}>
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

				{/* Modal con backdrop */}
				{selectedInvitacion && showModal && (
					<>
						<div className="modal fade show d-block" tabIndex="-1">
							<div className="modal-dialog modal-lg">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title">Detalle de Invitación</h5>
										<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
									</div>
									<div className="modal-body">
										<p><b>Invitado:</b> {selectedInvitacion.invitado}</p>
										<p><b>Evento:</b> {selectedInvitacion.evento}</p>
										<p><b>Estado:</b> {selectedInvitacion.estado}</p>
										<p><b>Fecha:</b> {selectedInvitacion.fecha}</p>
										<p><b>Código Único:</b> {selectedInvitacion.codigo}</p>
										<div className="row">
											<div className="col-md-6">
												<p><b>Código QR:</b></p>
												<img src={selectedInvitacion.qr} alt="QR" className="img-fluid border rounded" />
											</div>
											<div className="col-md-6">
												<p><b>Imagen de Invitación:</b></p>
												<img src={selectedInvitacion.imagen} alt="Invitación" className="img-fluid border rounded" />
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
									</div>
								</div>
							</div>
						</div>
						{/* Backdrop oscuro */}
						<div className="modal-backdrop fade show"></div>
					</>
				)}

				{/* Vista previa de imagen subida */}
				{nuevaImagen && (
					<div className="mt-4">
						<h5>📸 Vista previa de la nueva invitación:</h5>
						<img src={nuevaImagen} alt="Nueva Invitación" className="img-fluid border rounded" />
					</div>
				)}
			</main>
		</div>
	);
}

export default Invitaciones;
