import React, { useState, useEffect } from 'react';
import './style.css';
import Menu from './Menu';

function Invitaciones({ onNavigate }) {
	/*
	  RECOMENDACIONES PARA CONECTAR EL BACKEND
	  - Define REACT_APP_API_BASE con la URL base de tu API.
	    PowerShell: $env:REACT_APP_API_BASE='http://localhost:3000/api'; npm start
	  - Habilita CORS en el backend para el origen del frontend.
	  - Endpoints esperados:
	      GET  /api/invitaciones
	      GET  /api/estados
	      GET  /api/invitaciones/export
	      POST /api/invitaciones
	  - Si la forma de los datos es distinta, ajusta el mapeo de campos
	    más abajo (ej. nombre_invitado, nombre_evento, estado_nombre).
	*/
	const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

	// Estados para filtros y datos
	const [filtros, setFiltros] = useState({
		cedula: '',
		evento: '',
		estado: ''
	});
	const [invitaciones, setInvitaciones] = useState([]);
	const [estados, setEstados] = useState([]);
	const [eventos, setEventos] = useState([
		// Fallback en caso de que el backend no provea eventos
		'Tsáchila Economic Forum (TEF)',
		'Seminarios y Capacitaciones',
		'Eventos Cooperativos'
	]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Mapea estado a clases CSS personalizadas
	const getEstadoBadgeClass = (estadoNombre) => {
		switch ((estadoNombre || '').toLowerCase()) {
			case 'confirmado':
				return 'badge badge-confirmado';
			case 'pendiente':
				return 'badge badge-pendiente';
			case 'no asistió':
			case 'no asistio':
				return 'badge badge-inactivo';
			default:
				return 'badge bg-secondary';
		}
	};

	// Carga inicial desde el backend, con degradado a datos de muestra
	// Sugerencia: agrega paginación o filtros por querystring si el backend lo soporta
	useEffect(() => {
		let cancel = false;
		async function load() {
			try {
				setLoading(true);
				setError('');
				// Estados
				try {
					const resEstados = await fetch(`${API_BASE}/estados`);
					if (resEstados.ok) {
						const dataEstados = await resEstados.json();
						if (!cancel) setEstados(dataEstados);
					}
				} catch {}

				// Invitaciones
				let dataInv = [];
				try {
					const resInv = await fetch(`${API_BASE}/invitaciones`);
					if (resInv.ok) {
						dataInv = await resInv.json();
					}
				} catch {}

				if (!dataInv || dataInv.length === 0) {
					// Datos de respaldo para mostrar la interfaz exactamente como la imagen
					dataInv = [
						{ id: 1, invitado: 'JUAN ALAN PEREZ ZAMBRANO', evento: 'Tsáchila Economic Forum (TEF)', estado: 'Confirmado', fecha: '10/08/2025' },
						{ id: 2, invitado: 'ANA LUCIA RODRIGUEZ ESPINOZA', evento: 'Tsáchila Economic Forum (TEF)', estado: 'Pendiente', fecha: '10/08/2025' },
						{ id: 3, invitado: 'ANTHONY GEOVANNY MEJIA GAIBOR', evento: 'Seminarios y Capacitaciones', estado: 'No asistió', fecha: '10/08/2025' },
						{ id: 4, invitado: 'RONALD JOSUE PURUNCAJAS GONZALEZ', evento: 'Eventos Cooperativos', estado: 'Confirmado', fecha: '10/08/2025' }
					];
				}
				if (!cancel) setInvitaciones(dataInv);
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

	// Funciones de filtro y acciones
	const handleInputChange = e => {
		setFiltros({ ...filtros, [e.target.name]: e.target.value });
	};

	const handleBuscar = () => {
		/* Ejemplo para consultar con filtros al backend (si existe):
		const params = new URLSearchParams({
			cedula: filtros.cedula || undefined,
			evento: filtros.evento || undefined,
			estado: filtros.estado || undefined
		});
		fetch(`${API_BASE}/invitaciones?${params.toString()}`)
			.then(r => r.json())
			.then(setInvitaciones);
		*/
		// Por ahora, filtrado en memoria si se requiere mostrar resultados locales.
	};

	const handleLimpiar = () => {
		setFiltros({ cedula: '', evento: '', estado: '' });
	};

  return (
		<div className="d-flex min-vh-100 bg-light">
		{/* Sidebar */}
		<Menu onNavigate={onNavigate} activeItem="invitaciones" />

			{/* Contenido principal */}
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
								<button className="btn btn-success w-100">
									<i className="fa-solid fa-plus me-1"></i>Crear nueva invitación
								</button>
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
			{/* Asignación de invitaciones */}
			<div className="bg-white rounded shadow-sm p-3 mb-4">
				<div className="row g-2">
					<div className="col-12 col-md-6 col-lg-4">
						<label className="form-label">Cédula:</label>
						<input type="text" className="form-control" />
					</div>
					<div className="col-12 col-md-6 col-lg-4">
						<label className="form-label">Número celular:</label>
						<input type="text" className="form-control" />
					</div>
					<div className="col-12 col-md-6 col-lg-4">
						<label className="form-label">Correo:</label>
						<input type="email" className="form-control" />
					</div>
					<div className="col-12 col-md-6 col-lg-4">
						<label className="form-label">Código Único:</label>
						<input type="text" className="form-control" />
					</div>
					<div className="col-12 col-md-6 col-lg-4 d-flex flex-column justify-content-center">
						<div className="form-check">
							<input className="form-check-input" type="checkbox" id="correo" defaultChecked />
							<label className="form-check-label" htmlFor="correo">Correo electrónico</label>
						</div>
						<div className="form-check">
							<input className="form-check-input" type="checkbox" id="whatsapp" defaultChecked />
							<label className="form-check-label" htmlFor="whatsapp">WhatsApp</label>
						</div>
					</div>
				</div>
				<div className="mt-3 d-flex gap-2">
					{/* Si el backend devuelve una URL/imagen de QR, consúmela aquí */}
					<button className="btn btn-primary">
						<i className="fa-solid fa-qrcode me-1"></i>Crear QR para Confirmación
					</button>
					<button className="btn btn-primary">
						<i className="fa-solid fa-qrcode me-1"></i>Crear QR de página del evento
					</button>
				</div>
			</div>
			{/* Tabla de invitaciones */}
			<div className="table-container">
				<div className="card-body p-0">
					<div className="table-responsive">
						<table className="table table-hover mb-0">
							<thead className="table-events-header">
								<tr>
									<th className="table-cell">INVITADO</th>
									<th className="table-cell">EVENTO</th>
									<th className="table-cell">ESTADO</th>
									<th className="table-cell">FECHA</th>
									<th className="table-cell text-end">ACCIONES</th>
								</tr>
							</thead>
							<tbody>
								{loading && (
									<tr><td colSpan="5" className="loading-row">Cargando...</td></tr>
								)}
								{!loading && invitaciones.map(inv => {
									const nombreInvitado = inv.invitado || inv.nombre_invitado || inv.nombre || '-';
									const nombreEvento = inv.evento || inv.nombre_evento || inv.evento_nombre || '-';
									const estadoNombre = inv.estado || inv.estado_nombre || inv.nombre_estado || '';
									return (
										<tr key={inv.id || inv.id_invitacion} className="table-row-hover">
											<td className="table-cell">{nombreInvitado.toString().toUpperCase()}</td>
											<td className="table-cell">{nombreEvento}</td>
											<td className="table-cell">
												{/* Si el backend entrega IDs de estado, tradúcelos aquí a nombre/color */}
												<span className={getEstadoBadgeClass(estadoNombre)}>{estadoNombre}</span>
											</td>
											<td className="table-cell">{inv.fecha || inv.fecha_envio || '-'}</td>
											<td className="table-cell text-end">
												<button className="btn btn-link p-0 border-0 bg-transparent btn-link-custom">
													<i className="fa-solid fa-eye me-1"></i>Ver más
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
				</main>
		</div>
	);
}

export default Invitaciones;