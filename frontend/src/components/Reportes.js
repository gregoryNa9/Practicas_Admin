// src/components/Reportes.js
import React, { useState, useEffect } from 'react';
import './style.css';
//import logo from "../logo.jpg"; // Ajusta la ruta de tu logo según tu estructura de archivos

//const Reportes = () => {}
function Reportes({ onNavigate }) {
    /*
      RECOMENDACIONES PARA CONECTAR EL BACKEND EN DASHBOARD
      - Define REACT_APP_API_BASE con la URL base de tu API.
        PowerShell: $env:REACT_APP_API_BASE='http://localhost:3000/api'; npm start
      - Habilita CORS en el backend para el origen del frontend.
      - Endpoints recomendados para estadísticas:
          GET  /api/dashboard/stats        -> estadísticas generales (eventos, invitaciones, confirmaciones)
          GET  /api/invitaciones/count     -> conteo de invitaciones por estado
          GET  /api/eventos/count          -> conteo de eventos
      - Implementa autenticación con tokens JWT si es necesario.
      - Considera usar React Query o SWR para cache de datos.
      - Agrega loading states y manejo de errores.
    */
    return (
        
    <div className="d-flex min-vh-100 bg-light">
      {/* ASIDE reutilizado del Dashboard */}
      <aside className="sidebar">
        <div className="text-center mb-4">
        <img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
        </div>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button className="nav-link active sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('dashboard')}>
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">
        <h1 className="title">Reportes</h1>

        {/* FILTROS */}
        <div className="filters">
          <button className="btn-filtro">Filtros</button>
          <select className="select-evento">
            <option value="">Tipo de evento</option>
            <option value="conferencia">Conferencia</option>
            <option value="seminario">Seminario</option>
            <option value="taller">Taller</option>
          </select>
          <input type="date" className="input-fecha" />
          <button className="btn-buscar">Buscar</button>
          <button className="btn-limpiar">Limpiar</button>
        </div>

        {/* TARJETAS DE INFORMACIÓN */}
        <div className="cards-container">
          <div className="card">
            <span className="card-title">Invitados</span>
            <span className="card-value">#total_invitados</span>
          </div>
          <div className="card">
            <span className="card-title">Asistentes</span>
            <span className="card-value">#Asistentes-reales</span>
          </div>
          <div className="card">
            <span className="card-title">Confirmados</span>
            <span className="card-value">#total_registrados</span>
          </div>
          <div className="card">
            <span className="card-title">Eventos creados</span>
            <span className="card-value">#eventos-total</span>
          </div>
          <div className="card">
            <span className="card-title">Top 10</span>
            <span className="card-value">#10_mas-invitados</span>
          </div>
          <div className="card">
            <span className="card-title">Top 10</span>
            <span className="card-value">#10_mas_asisten</span>
          </div>
        </div>

        {/* GRÁFICOS */}
        <div className="charts-container">
          <div className="chart">
            <h2>Estado de invitados por evento</h2>
            <div className="chart-placeholder">[ Gráfico de línea aquí ]</div>
          </div>
          <div className="chart">
            <h2>Invitaciones confirmadas</h2>
            <div className="chart-placeholder">[ Gráfico circular aquí ]</div>
          </div>
        </div>

        {/* TABLA DE INVITADOS */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Empresa</th>
                <th>Eventos Asistidos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JUAN ALAN PEREZ ZAMBRANO</td>
                <td>PRONACA</td>
                <td>10</td>
                <td><button className="btn-ver">👁 Ver más</button></td>
              </tr>
              <tr>
                <td>ANA LUCIA RODRIGUEZ ESPINOZA</td>
                <td>PRONACA</td>
                <td>5</td>
                <td><button className="btn-ver">👁 Ver más</button></td>
              </tr>
              <tr>
                <td>ANTHONY GEOVANNY MEJÍA GAIBOR</td>
                <td>POLACA</td>
                <td>7</td>
                <td><button className="btn-ver">👁 Ver más</button></td>
              </tr>
              <tr>
                <td>RONALD JOSUE PURUNCAJAS GONZALEZ</td>
                <td>POLACA</td>
                <td>9</td>
                <td><button className="btn-ver">👁 Ver más</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Reportes;
