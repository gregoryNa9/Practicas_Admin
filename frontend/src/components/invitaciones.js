import React, { useState, useEffect } from 'react';
import './style.css';
import Menu from './Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QRCodeCanvas } from 'qrcode.react';

function Invitaciones({ onNavigate }) {
	const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

	// Estados principales
	const [filtros, setFiltros] = useState({ cedula: '', evento: '', estado: '' });
	const [invitaciones, setInvitaciones] = useState([]);
	const [usuarios, setUsuarios] = useState([]);
	const [estados, setEstados] = useState([]);
	const [eventos] = useState([
		'Tsáchila Economic Forum (TEF)',
		'Seminarios y Capacitaciones',
		'Eventos Cooperativos'
	]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Modal detalle invitación
	const [showModal, setShowModal] = useState(false);
	const [selectedInvitacion, setSelectedInvitacion] = useState(null);

	// Estado para imagen subida
	const [nuevaImagen, setNuevaImagen] = useState(null);

	// Estado para asignación de invitaciones
	const [asignacion, setAsignacion] = useState({
		cedula: '',
		celular: '',
		correo: '',
		codigo: '',
		enviarCorreo: false,
		enviarSMS: false,
	});

	// Modal de asignación y QR
	const [showAsignacionModal, setShowAsignacionModal] = useState(false);
	const [showQRModal, setShowQRModal] = useState(false);

	// Badge estado
	const getEstadoBadgeClass = (estadoNombre) => {
		switch ((estadoNombre || '').toLowerCase()) {
			case 'confirmado': return 'badge badge-confirmado';
			case 'pendiente': return 'badge badge-pendiente';
			case 'no asistió':
			case 'no asistio': return 'badge badge-inactivo';
			default: return 'badge bg-secondary';
		}
	};

	// Cargar invitaciones
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
					dataInv = [
						{ id: 1, invitado: 'JUAN ALAN PEREZ ZAMBRANO', evento: 'Tsáchila Economic Forum (TEF)', estado: 'Confirmado', fecha: '10/08/2025', codigo: 'TEF-1234', qr: '', imagen: '/inv1.jpg' },
						{ id: 2, invitado: 'ANA LUCIA RODRIGUEZ ESPINOZA', evento: 'Seminarios y Capacitaciones', estado: 'Pendiente', fecha: '12/08/2025', codigo: 'TEF-5678', qr: '', imagen: '/inv2.jpg' },
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

	// Cargar usuarios
	useEffect(() => {
		async function loadUsuarios() {
			try {
				const res = await fetch(`${API_BASE}/usuarios`);
				if (res.ok) {
					const data = await res.json();
					setUsuarios(data);
				}
			} catch (err) {
				console.error("Error cargando usuarios:", err);
			}
		}
		loadUsuarios();
	}, [API_BASE]);

	// Filtros
	const handleInputChange = e => setFiltros({ ...filtros, [e.target.name]: e.target.value });
	const handleBuscar = () => {};
	const handleLimpiar = () => setFiltros({ cedula: '', evento: '', estado: '' });

	// Modal detalle invitación
	const handleVerMas = (inv) => {
		setSelectedInvitacion(inv);
		setShowModal(true);
	};

	// Imagen subida
	const handleImagenChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setNuevaImagen(URL.createObjectURL(e.target.files[0]));
		}
	};

	// Inputs asignación
	const handleAsignacionChange = (e) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === 'checkbox' ? checked : value;
		let updatedAsignacion = { ...asignacion, [name]: newValue };

		if (name === 'cedula' && value.length >= 4) {
			const ultimos4 = value.slice(-4);
			updatedAsignacion.codigo = `TEF-${ultimos4}`;
		}

		setAsignacion(updatedAsignacion);
	};

	// Seleccionar usuario
	const handleSelectUsuario = (e) => {
		const usuarioId = e.target.value;
		const usuario = usuarios.find(u => String(u.id) === usuarioId);
		if (usuario) {
			setAsignacion({
				cedula: usuario.cedula || '',
				celular: usuario.celular || '',
				correo: usuario.correo || '',
				codigo: usuario.cedula ? `TEF-${usuario.cedula.slice(-4)}` : '',
				enviarCorreo: false,
				enviarSMS: false,
			});
		}
	};

	// Asignar invitación
	const handleAsignarInvitacion = () => {
		console.log("📨 Datos de asignación:", asignacion);
	};

	// Filtrado de invitaciones
	const invitacionesFiltradas = invitaciones.filter(inv => {
		return (
			(filtros.cedula === '' || inv.invitado.toLowerCase().includes(filtros.cedula.toLowerCase())) &&
			(filtros.evento === '' || inv.evento === filtros.evento) &&
			(filtros.estado === '' || inv.estado.toLowerCase() === filtros.estado.toLowerCase())
		);
	});

	return (
		<div className="d-flex min-vh-100 bg-light">
			<Menu onNavigate={onNavigate} activeItem="invitaciones" />
			<main className="flex-grow-1 p-5">
				<h2 className="text-primary fw-bold mb-3">Invitaciones</h2>

				

				{/* Filtros */}
				<div className="card shadow-sm mb-4">
					<div className="card-body">
						<div className="row g-3 align-items-end">
							<div className="col-md-4">
								<label className="form-label">Cédula</label>
								<input type="text" name="cedula" className="form-control" value={filtros.cedula} onChange={handleInputChange} />
							</div>
							<div className="col-md-4">
								<label className="form-label">Evento</label>
								<select name="evento" className="form-select" value={filtros.evento} onChange={handleInputChange}>
									<option value="">Todos</option>
									{eventos.map((ev, i) => (
										<option key={i} value={ev}>{ev}</option>
									))}
								</select>
							</div>
							<div className="col-md-4">
								<label className="form-label">Estado</label>
								<select name="estado" className="form-select" value={filtros.estado} onChange={handleInputChange}>
									<option value="">Todos</option>
									<option value="Confirmado">Confirmado</option>
									<option value="Pendiente">Pendiente</option>
									<option value="No Asistió">No Asistió</option>
								</select>
							</div>
							<div className="col-12 d-flex gap-2 mt-2">
								<button className="btn btn-primary" onClick={handleBuscar}><i className="fa-solid fa-search me-1"></i>Buscar</button>
								<button className="btn btn-secondary" onClick={handleLimpiar}><i className="fa-solid fa-eraser me-1"></i>Limpiar</button>
							</div>
						</div>
					</div>
				</div>
				{/* Botón ventana de asignación */}
				<div className="mb-3">
					<button className="btn btn-info" onClick={() => setShowAsignacionModal(true)}>
						<i className="fa-solid fa-user-plus me-1"></i> Ventana de Asignación
					</button>
				</div>

				{/* Tabla de invitaciones */}
				<div className="card shadow-sm">
					<div className="card-body">
						{loading ? (
							<p>Cargando invitaciones...</p>
						) : error ? (
							<p className="text-danger">{error}</p>
						) : (
							<div className="table-responsive">
								<table className="table table-hover align-middle">
									<thead>
										<tr>
											<th>Invitado</th>
											<th>Evento</th>
											<th>Estado</th>
											<th>Fecha</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										{invitacionesFiltradas.map(inv => (
											<tr key={inv.id}>
												<td>{inv.invitado}</td>
												<td>{inv.evento}</td>
												<td><span className={getEstadoBadgeClass(inv.estado)}>{inv.estado}</span></td>
												<td>{inv.fecha}</td>
												<td>
													<button className="btn btn-sm btn-primary" onClick={() => handleVerMas(inv)}>
														<i className="fa-solid fa-eye me-1"></i> Ver más
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>

				{/* Modal detalle invitación */}
				{showModal && selectedInvitacion && (
					<>
						<div className="modal fade show d-block" tabIndex="-1">
							<div className="modal-dialog modal-lg">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title">Detalle de Invitación</h5>
										<button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
									</div>
									<div className="modal-body">
										<div className="row g-3">
											<div className="col-md-6">
												<p><strong>Invitado:</strong> {selectedInvitacion.invitado}</p>
												<p><strong>Evento:</strong> {selectedInvitacion.evento}</p>
												<p><strong>Estado:</strong> <span className={getEstadoBadgeClass(selectedInvitacion.estado)}>{selectedInvitacion.estado}</span></p>
												<p><strong>Fecha:</strong> {selectedInvitacion.fecha}</p>
												<p><strong>Código:</strong> {selectedInvitacion.codigo}</p>
											</div>
											<div className="col-md-6 text-center">
												<img src={nuevaImagen || selectedInvitacion.imagen} alt="invitacion" className="img-fluid rounded" />
												<input type="file" className="form-control mt-2" onChange={handleImagenChange} />
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-backdrop fade show"></div>
					</>
				)}

				{/* Modal ventana asignación */}
				{showAsignacionModal && (
					<>
						<div className="modal fade show d-block" tabIndex="-1">
							<div className="modal-dialog modal-lg">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title">Asignar Invitación</h5>
										<button type="button" className="btn-close" onClick={() => setShowAsignacionModal(false)}></button>
									</div>
									<div className="modal-body">
										<div className="mb-3">
											<label className="form-label">Seleccionar Usuario:</label>
											<select className="form-select" onChange={handleSelectUsuario}>
												<option value="">-- Seleccione un usuario --</option>
												{usuarios.map(u => (
													<option key={u.id} value={u.id}>{u.nombre} - {u.cedula}</option>
												))}
											</select>
										</div>
										<div className="row g-2">
											<div className="col-md-6">
												<label className="form-label">Cédula:</label>
												<input type="text" name="cedula" className="form-control" value={asignacion.cedula} onChange={handleAsignacionChange} />
											</div>
											<div className="col-md-6">
												<label className="form-label">Correo:</label>
												<input type="email" name="correo" className="form-control" value={asignacion.correo} onChange={handleAsignacionChange} />
											</div>
											<div className="col-md-6">
												<label className="form-label">Celular:</label>
												<input type="text" name="celular" className="form-control" value={asignacion.celular} onChange={handleAsignacionChange} />
											</div>
											<div className="col-md-6">
												<label className="form-label">Código Único:</label>
												<input type="text" name="codigo" className="form-control" value={asignacion.codigo} readOnly />
											</div>
										</div>
										<div className="mt-3">
											<button className="btn btn-success" onClick={() => setShowQRModal(true)}>
												<i className="fa-solid fa-qrcode me-1"></i> Generar Código QR
											</button>
										</div>
									</div>
									<div className="modal-footer">
										<button className="btn btn-secondary" onClick={() => setShowAsignacionModal(false)}>Cerrar</button>
										<button className="btn btn-primary" onClick={handleAsignarInvitacion}>Asignar Invitación</button>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-backdrop fade show"></div>
					</>
				)}

				{/* Modal mostrar QR */}
				{showQRModal && (
					<>
						<div className="modal fade show d-block" tabIndex="-1">
							<div className="modal-dialog modal-sm">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title">Código QR</h5>
										<button type="button" className="btn-close" onClick={() => setShowQRModal(false)}></button>
									</div>
									<div className="modal-body text-center">
										{asignacion.codigo ? (
											<QRCodeCanvas value={asignacion.codigo} size={200} />
										) : (
											<p>No hay código generado</p>
										)}
									</div>
									<div className="modal-footer">
										<button className="btn btn-secondary" onClick={() => setShowQRModal(false)}>Cerrar</button>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-backdrop fade show"></div>
					</>
				)}
			</main>
		</div>
	);
}

export default Invitaciones;
