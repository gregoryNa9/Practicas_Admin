import React, { useState, useEffect } from 'react';
import './style.css';

function Confirmaciones({ onNavigate }) {
	/*
	  RECOMENDACIONES PARA CONECTAR EL BACKEND EN CONFIRMACIONES
	  - Define REACT_APP_API_BASE con la URL base de tu API.
	    PowerShell: $env:REACT_APP_API_BASE='http://localhost:3000/api'; npm start
	  - Habilita CORS en el backend para el origen del frontend.
	  - Endpoints recomendados:
	      GET  /api/confirmaciones         -> lista de confirmaciones
	      GET  /api/confirmaciones/stats   -> estadísticas de confirmaciones
	      PUT  /api/confirmaciones/:id     -> actualizar estado de confirmación
	  - Implementa filtros por tipo de evento y fecha.
	  - Considera paginación para la tabla de confirmaciones.
	*/
	const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

	// Estados para filtros y datos
	const [filtros, setFiltros] = useState({
		tipoEvento: '',
		fechaEvento: ''
	});
	const [confirmaciones, setConfirmaciones] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Tipos de evento disponibles
	const tiposEvento = ['Tsáchila Economic Forum (TEF)', 'Seminarios y Capacitaciones', 'Eventos Cooperativos'];

	// Carga inicial desde el backend, con degradado a datos de muestra
	useEffect(() => {
		let cancel = false;
		async function load() {
			try {
				setLoading(true);
				setError('');
				
				// Cargar confirmaciones
				let dataConfirmaciones = [];
				try {
					const resConfirmaciones = await fetch(`${API_BASE}/confirmaciones`);
					if (resConfirmaciones.ok) {
						dataConfirmaciones = await resConfirmaciones.json();
					}
				} catch {}

				if (!dataConfirmaciones || dataConfirmaciones.length === 0) {
					// Datos de respaldo para mostrar la interfaz exactamente como la imagen
					dataConfirmaciones = [
						{
							id: 1,
							invitado: 'JUAN ALAN PEREZ ZAMBRANO',
							evento: 'Tsáchila Economic Forum (TEF)',
							estado: 'Confirmado',
							fecha: '10/08/2025'
						},
						{
							id: 2,
							invitado: 'ANA LUCIA RODRIGUEZ ESPINOZA',
							evento: 'Tsáchila Economic Forum (TEF)',
							estado: 'Pendiente',
							fecha: '10/08/2025'
						},
						{
							id: 3,
							invitado: 'ANTHONY GEOVANNY MEJIA GAIBOR',
							evento: 'Seminarios y Capacitaciones',
							estado: 'Pendiente',
							fecha: '10/08/2025'
						},
						{
							id: 4,
							invitado: 'RONALD JOSUE PURUNCAJAS GONZALEZ',
							evento: 'Eventos Cooperativos',
							estado: 'Confirmado',
							fecha: '10/08/2025'
						}
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
		fetch(`${API_BASE}/confirmaciones?${params.toString()}`)
			.then(r => r.json())
			.then(setConfirmaciones);
		*/
		// Por ahora, filtrado en memoria si se requiere mostrar resultados locales.
	};

	const handleLimpiar = () => {
		setFiltros({ tipoEvento: '', fechaEvento: '' });
	};

	// Mapea estado a clases CSS personalizadas
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
			{/* Sidebar igual a otros componentes */}
			<aside className="sidebar">
				<div className="text-center mb-4">
					<img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
				</div>
				<nav>
					<ul className="nav flex-column">
						<li className="nav-item mb-2">
							<button className="nav-link sidebar-nav-item btn btn-link p-0 text-start w-100" onClick={() => onNavigate('dashboard')}>
								<i className="fa-solid fa-gauge me-2"></i>Dashboard
							</button>
						</li>
						<li className="nav-item mb-2">
							<button 
								className="nav-link sidebar-nav-item btn btn-link p-0 text-start w-100" onClick={() => onNavigate('eventos')}
								style={{ 
									textDecoration: 'none',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => e.target.style.color = '#009FE3'}
								onMouseLeave={(e) => e.target.style.color = '#fff'}
							>
								<i className="fa-solid fa-calendar-days me-2"></i>Eventos
							</button>
						</li>
						<li className="nav-item mb-2">
							<button 
								className="nav-link text-white btn btn-link p-0 text-start w-100" 
								onClick={() => onNavigate('invitaciones')}
								style={{ 
									textDecoration: 'none',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => e.target.style.color = '#009FE3'}
								onMouseLeave={(e) => e.target.style.color = '#fff'}
							>
								<i className="fa-solid fa-envelope me-2"></i>Invitaciones
							</button>
						</li>
						<li className="nav-item mb-2">
							<button 
								className="nav-link active text-white btn btn-link p-0 text-start w-100" 
								onClick={() => onNavigate('confirmaciones')}
								style={{ 
									textDecoration: 'none',
									backgroundColor: '#009FE3',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => e.target.style.backgroundColor = '#009FE3'}
								onMouseLeave={(e) => e.target.style.backgroundColor = '#009FE3'}
							>
								<i className="fa-solid fa-check me-2"></i>Confirmaciones
							</button>
						</li>
						<li className="nav-item mb-2">
							<button 
								className="nav-link text-white btn btn-link p-0 text-start w-100" 
								onClick={() => onNavigate('reportes')}
								style={{ 
									textDecoration: 'none',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => e.target.style.color = '#009FE3'}
								onMouseLeave={(e) => e.target.style.color = '#fff'}
							>
								<i className="fa-solid fa-file me-2"></i>Reportes
							</button>
						</li>
						<li className="nav-item mt-4">
							<button 
								className="nav-link text-white btn btn-link p-0 text-start w-100" 
								onClick={() => onNavigate('login')}
								style={{ 
									textDecoration: 'none',
									transition: 'all 0.3s ease'
								}}
								onMouseEnter={(e) => e.target.style.color = '#009FE3'}
								onMouseLeave={(e) => e.target.style.color = '#fff'}
							>
								<i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Salir
							</button>
						</li>
					</ul>
				</nav>
			</aside>

			{/* Contenido principal */}
			<main className="flex-grow-1 p-5">
				<h2 className="text-primary fw-bold mb-3">Confirmaciones</h2>
				
				{/* Filtros */}
				<div className="bg-white rounded shadow-sm p-3 mb-4">
					<div className="row g-2 align-items-end">
						<div className="col-auto">
							<button 
								className="btn text-white" 
								style={{ 
									backgroundColor: '#009FE3',
									border: 'none'
								}}
							>
								Filtros
							</button>
						</div>
						<div className="col-md-3">
							<label className="form-label">Tipo de evento:</label>
							<select 
								className="form-select" 
								name="tipoEvento" 
								value={filtros.tipoEvento} 
								onChange={handleInputChange}
							>
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
							<button 
								className="btn text-white" 
								onClick={handleBuscar}
								style={{ 
									backgroundColor: '#043474',
									border: 'none'
								}}
							>
								<i className="fa-solid fa-magnifying-glass me-1"></i>Buscar
							</button>
							<button 
								className="btn text-white" 
								onClick={handleLimpiar}
								style={{ 
									backgroundColor: '#009FE3',
									border: 'none'
								}}
							>
								<i className="fa-solid fa-eraser me-1"></i>Limpiar
							</button>
						</div>
					</div>
					{error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
				</div>

				{/* Tabla de confirmaciones */}
				<div className="card shadow-sm">
					<div className="card-body p-0">
						<div className="table-responsive">
							<table className="table table-hover mb-0">
								<thead style={{ backgroundColor: '#043474' }}>
									<tr>
										<th className="text-white border-0">INVITADO</th>
										<th className="text-white border-0">EVENTO</th>
										<th className="text-white border-0">ESTADO</th>
										<th className="text-white border-0">FECHA</th>
										<th className="text-white border-0 text-end">ACCIONES</th>
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
											<td className="border-0 text-end">
												<button 
													className="btn btn-link text-primary p-0" 
													style={{ 
														textDecoration: 'none',
														transition: 'color 0.3s ease'
													}}
													onMouseEnter={(e) => e.target.style.color = '#009FE3'}
													onMouseLeave={(e) => e.target.style.color = '#0d6efd'}
												>
													<i className="fa-solid fa-eye me-1"></i>Ver más
												</button>
											</td>
										</tr>
									))}
									{/* Filas vacías para completar la tabla como en la imagen */}
									{!loading && confirmaciones.length < 6 && (
										Array.from({ length: 6 - confirmaciones.length }).map((_, index) => (
											<tr key={`empty-${index}`} style={{ backgroundColor: '#f8f9fa' }}>
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

export default Confirmaciones;
