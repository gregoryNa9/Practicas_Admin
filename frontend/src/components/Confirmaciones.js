import React, { useState, useEffect } from 'react';
import './style.css';
import Menu from './Menu';

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

					<div className="row g-2 mt-2">
						<div className="col-12 col-md-6 d-grid">
							<button className="btn btn-confirmaciones-secondary d-none d-sm-block d-lg-none w-100" onClick={handleBuscar}>
								<i className="fa-solid fa-magnifying-glass me-1"></i>Buscar
							</button>
						</div>
						<div className="col-12 col-md-6 d-grid">
							<button className="btn btn-confirmaciones-primary d-none d-sm-block d-lg-none w-100" onClick={handleLimpiar}>
								<i className="fa-solid fa-eraser me-1"></i>Limpiar
							</button>
						</div>
					</div>
					{error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
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
										<th className="text-white border-0 ">ACCIONES</th>
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
											<td className="border-0 ">
												<button className="btn btn-link text-primary btn-ver-mas">
													<i className="fa-solid fa-eye me-1"></i>Ver más
												</button>
											</td>
										</tr>
									))}
									{/* Filas vacías para completar la tabla como en la imagen */}
									{!loading && confirmaciones.length < 6 && (
										Array.from({ length: 6 - confirmaciones.length }).map((_, index) => (
											<tr key={`empty-${index}`} className="table-empty-row">
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
