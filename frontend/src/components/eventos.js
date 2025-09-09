import React, { useState, useEffect } from 'react';
import './style.css';

function Eventos({ onNavigate }) {
	/*
	  RECOMENDACIONES PARA CONECTAR EL BACKEND EN EVENTOS
	  - Define REACT_APP_API_BASE con la URL base de tu API.
	    PowerShell: $env:REACT_APP_API_BASE='http://localhost:3000/api'; npm start
	  - Habilita CORS en el backend para el origen del frontend.
	  - Endpoints recomendados:
	      GET  /api/eventos              -> lista de eventos
	      GET  /api/eventos/stats        -> estadísticas de eventos
	      POST /api/eventos              -> crear evento
	      PUT  /api/eventos/:id          -> actualizar evento
	      DELETE /api/eventos/:id        -> eliminar evento
	  - Implementa filtros por tipo de evento y fecha.
	  - Considera paginación para la tabla de eventos.
	*/
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

	// Tipos de evento disponibles
	const tiposEvento = ['Macroevento', 'Adicional', 'Especial'];

	// Carga inicial desde el backend, con degradado a datos de muestra
	useEffect(() => {
		let cancel = false;
		async function load() {
			try {
				setLoading(true);
				setError('');
				
				// Cargar eventos
				let dataEventos = [];
				try {
					const resEventos = await fetch(`${API_BASE}/eventos`);
					if (resEventos.ok) {
						dataEventos = await resEventos.json();
					}
				} catch {}

				// Cargar estadísticas
				try {
					const resStats = await fetch(`${API_BASE}/eventos/stats`);
					if (resStats.ok) {
						const dataStats = await resStats.json();
						if (!cancel) setEstadisticas(dataStats);
					}
				} catch {}

				if (!dataEventos || dataEventos.length === 0) {
					// Datos de respaldo para mostrar la interfaz exactamente como la imagen
					dataEventos = [
						{
							id: 1,
							nombre: 'Tsáchila Economic Forum (TEF)',
							categoria: 'Macroevento',
							estado: 'Activo',
							fechaCreacion: '10/08/2025'
						},
						{
							id: 2,
							nombre: 'Tsáchila Economic Forum (TEF)',
							categoria: 'Macroevento',
							estado: 'Inactivo',
							fechaCreacion: '10/08/2025'
						},
						{
							id: 3,
							nombre: 'Seminarios y Capacitaciones',
							categoria: 'Adicional',
							estado: 'Inactivo',
							fechaCreacion: '10/08/2025'
						},
						{
							id: 4,
							nombre: 'Eventos Cooperativos',
							categoria: 'Adicional',
							estado: 'Activo',
							fechaCreacion: '10/08/2025'
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

	// Funciones de filtro y acciones
	const handleInputChange = e => {
		setFiltros({ ...filtros, [e.target.name]: e.target.value });
	};

	const handleBuscar = () => {
		/* Ejemplo para consultar con filtros al backend (si existe):
		const params = new URLSearchParams({
			tipo: filtros.tipoEvento || undefined,
			fecha: filtros.fechaEvento || undefined
		});
		fetch(`${API_BASE}/eventos?${params.toString()}`)
			.then(r => r.json())
			.then(setEventos);
		*/
		// Por ahora, filtrado en memoria si se requiere mostrar resultados locales.
	};

	const handleLimpiar = () => {
		setFiltros({ tipoEvento: '', fechaEvento: '' });
	};

	// Mapea estado a clases CSS personalizadas
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

	return (
		<div className="d-flex min-vh-100 bg-light">
			{/* Sidebar igual a otros componentes */}
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
				<h2 className="text-primary fw-bold mb-3">Eventos</h2>
				
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
							<input type="text" className="form-control" placeholder="dd/mm/aaaa"name="fechaEvento" value={filtros.fechaEvento} onChange={handleInputChange} />
						</div>
						<div className="col-auto d-flex gap-2">
							<button className="btn btn-primary" onClick={handleBuscar}>
								<i className="fa-solid fa-magnifying-glass me-1"></i>Buscar
							</button>
							<button className="btn btn-outline-secondary" onClick={handleLimpiar}>
								<i className="fa-solid fa-eraser me-1"></i>Limpiar
							</button>
							<button className="btn btn-primary" onClick={() => onNavigate('new-evento')}>
								<i className="fa-solid fa-plus me-1"></i>Nuevo
							</button>
						</div>
					</div>
					{error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
				</div>

				{/* Tarjetas de resumen */}
				<div className="row g-4 mb-4">
					<div className="col-md-4">
						<div className="card shadow-sm">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start">
									<div>
										<h6 className="card-title text-muted mb-2">Evento Activo</h6>
										<h4 className="text-primary fw-bold mb-0">{estadisticas.eventoActivo}</h4>
									</div>
									<div className="bg-primary text-white rounded p-2">
										<i className="fa-solid fa-square-check"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="card shadow-sm">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start">
									<div>
										<h6 className="card-title text-muted mb-2">Invitados</h6>
										<h4 className="text-primary fw-bold mb-0">{estadisticas.totalInvitados}</h4>
									</div>
									<div className="bg-primary text-white rounded p-2">
										<i className="fa-solid fa-envelope"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="card shadow-sm">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start">
									<div>
										<h6 className="card-title text-muted mb-2">Confirmados</h6>
										<h4 className="text-primary fw-bold mb-0">{estadisticas.totalConfirmados}</h4>
									</div>
									<div className="bg-primary text-white rounded p-2">
										<i className="fa-solid fa-calendar-check"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tabla de eventos */}
				<div className="card shadow-sm">
					<div className="card-body p-0">
						<div className="table-responsive">
							<table className="table table-hover mb-0">
								<thead className="table-events-header">
									<tr>
										<th className="text-white border-0">EVENTO</th>
										<th className="text-white border-0">CATEGORIA</th>
										<th className="text-white border-0">ESTADO</th>
										<th className="text-white border-0">FECHA DE CREACION</th>
										<th className="text-white border-0 text-end">ACCIONES</th>
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
											<td className="border-0 text-end">
												<div className="btn-group" role="group">
													<button className="btn btn-link text-primary btn-action" title="Ver">
														<i className="fa-solid fa-eye"></i>
													</button>
													<button className="btn btn-link text-primary btn-action" title="Editar">
														<i className="fa-solid fa-pen-to-square"></i>
													</button>
													<button className="btn btn-link btn-action-danger" title="Eliminar">
														<i className="fa-solid fa-trash-can"></i>
													</button>
												</div>
											</td>
										</tr>
									))}
									{/* Filas vacías para completar la tabla como en la imagen */}
									{!loading && eventos.length < 6 && (
										Array.from({ length: 6 - eventos.length }).map((_, index) => (
											<tr key={`empty-${index}`}>
												<td className="border-0">&nbsp;</td>
												<td className="border-0">&nbsp;</td>
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

export default Eventos;
