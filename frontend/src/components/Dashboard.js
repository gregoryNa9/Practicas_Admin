import React from 'react';
import './style.css';

// 📊 Importar Chart.js y react-chartjs-2
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// ✅ Registrar los módulos necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// ──────────────────────────────────────────────────────────────────────────────
// Recomendaciones para conectar con el backend desde este Dashboard
//
// 1) Configura la base URL del backend mediante variable de entorno:
//    - Crea en el frontend un archivo `.env` con, por ejemplo:
//      REACT_APP_API_BASE_URL=http://localhost:3000/api
//    - Reinicia el servidor del frontend tras crear/editar `.env`.
//    - Usa process.env.REACT_APP_API_BASE_URL para construir las URLs.
//
// 2) Endpoints sugeridos (ajústalos a tus rutas reales del backend):
//    - Eventos:
//        GET /eventos/count                → { count: number }
//        GET /eventos/estadisticas-linea   → { labels: string[], values: number[] }
//    - Invitaciones:
//        GET /invitaciones/count           → { count: number }
//        GET /invitaciones/resumen         → { confirmadas: number, noConfirmadas: number }
//    - Confirmaciones:
//        GET /confirmaciones/count         → { count: number }
//
//   Nota: En este repo existen rutas para `invitaciones` y `confirmaciones` en `src/routes/`. 
//   Si no tienes aún rutas de `eventos` en el backend, crea el modelo/controlador/ruta
//   (p. ej. `Evento`) y expón al menos un endpoint `GET /eventos/count`.
//
// 3) Patrón de consumo desde React:
//    - Crea estados para KPIs (eventos, invitaciones, confirmaciones) y para los
//      datasets de los gráficos.
//    - En un useEffect inicial, realiza las peticiones al backend en paralelo
//      y actualiza los estados al resolver.
//    - Muestra spinners o valores por defecto mientras carga, y maneja errores.
//
// 4) Ejemplo (en comentarios) de cómo traer datos reales:
//    
//    const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
//    const [kpi, setKpi] = React.useState({ eventos: 0, invitaciones: 0, confirmaciones: 0 });
//    const [lineChart, setLineChart] = React.useState({ labels: [], values: [] });
//    const [resumeInvitaciones, setResumeInvitaciones] = React.useState({ confirmadas: 0, noConfirmadas: 0 });
//
//    React.useEffect(() => {
//      const abort = new AbortController();
//      (async () => {
//        try {
//          const [evRes, invRes, confRes, lineaRes, resumenRes] = await Promise.all([
//            fetch(`${API_URL}/eventos/count`, { signal: abort.signal }),
//            fetch(`${API_URL}/invitaciones/count`, { signal: abort.signal }),
//            fetch(`${API_URL}/confirmaciones/count`, { signal: abort.signal }),
//            fetch(`${API_URL}/eventos/estadisticas-linea`, { signal: abort.signal }),
//            fetch(`${API_URL}/invitaciones/resumen`, { signal: abort.signal })
//          ]);
//          const [{ count: evCount }, { count: invCount }, { count: confCount }, linea, resumen] = await Promise.all([
//            evRes.json(), invRes.json(), confRes.json(), lineaRes.json(), resumenRes.json()
//          ]);
//          setKpi({ eventos: evCount, invitaciones: invCount, confirmaciones: confCount });
//          setLineChart({ labels: linea.labels, values: linea.values });
//          setResumeInvitaciones({ confirmadas: resumen.confirmadas, noConfirmadas: resumen.noConfirmadas });
//        } catch (err) {
//          if (err.name !== 'AbortError') console.error('Error cargando dashboard:', err);
//        }
//      })();
//      return () => abort.abort();
//    }, []);
//
// 5) Adaptación al gráfico:
//    - Para el Line chart: usa `labels` y `values` desde el backend.
//    - Para el Doughnut: usa los valores `confirmadas` y `noConfirmadas`.
//
// ──────────────────────────────────────────────────────────────────────────────

function Dashboard({ onNavigate }) {
  // 📊 Datos del gráfico de línea (estado de invitados)
  // Reemplazar `lineData` estático por datos reales del backend (ver punto 5):
  // const lineData = {
  //   labels: lineChart.labels,
  //   datasets: [{ label: 'Invitados confirmados', data: lineChart.values, ... }]
  // };
  const lineData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Invitados confirmados',
        data: [120, 150, 180, 200, 170, 220],
        borderColor: '#009FE3',
        backgroundColor: 'rgba(0,159,227,0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  // 📊 Datos del gráfico circular (Safety score)
  // Reemplazar por el resumen real de invitaciones desde backend:
  // data: [resumeInvitaciones.confirmadas, resumeInvitaciones.noConfirmadas]
  const doughnutData = {
    labels: ['Safety', 'Resto'],
    datasets: [
      {
        data: [93, 7], // 9.3 sobre 10 equivale a 93%
        backgroundColor: ['#00bfff', '#e0e0e0'],
        borderWidth: 0
      }
    ]
  };

  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
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
            <li className="nav-item mb-2">
              <button className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" onClick={() => onNavigate('new-user')}>
                <i className="fa-solid fa-user-plus me-2"></i>Nuevo Usuario
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

      {/* Main Content */}
      <main className="flex-grow-1 p-5">
        <h1 className="page-title">Dashboard</h1>
        <h2 className="text-info fw-normal">Bienvenido, usuario</h2>
        <div className="row my-4 g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="stats-card equal-card">
              <div className="stats-label">
                Eventos creados <i className="fa-solid fa-calendar-days"></i>
              </div>
              {/* Sustituir por valor real desde GET /eventos/count → { count } */}
              {/* Ejemplo: <div className="stats-number">{kpi.eventos}</div> */}
              <div className="stats-number">#eventos</div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="stats-card equal-card">
              <div className="stats-label">
                Invitaciones enviadas <i className="fa-solid fa-envelope"></i>
              </div>
              {/* Sustituir por valor real desde GET /invitaciones/count → { count } */}
              {/* Ejemplo: <div className="stats-number">{kpi.invitaciones}</div> */}
              <div className="stats-number">#invitaciones</div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="stats-card equal-card">
              <div className="stats-label">
                Confirmaciones <i className="fa-solid fa-check"></i>
              </div>
              {/* Sustituir por valor real desde GET /confirmaciones/count → { count } */}
              {/* Ejemplo: <div className="stats-number">{kpi.confirmaciones}</div> */}
              <div className="stats-number">#confirmaciones</div>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-12 col-xl-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="fw-bold mb-2">Estado de invitados por evento</div>
                {/* Para usar datos reales: <Line data={{ labels: lineChart.labels, datasets: [{ ...data: lineChart.values }] }} options={lineOptions} /> */}
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <div className="mb-2">
                  {/* Reemplaza 300/200 con valores reales de GET /invitaciones/resumen */}
                  <div className="bg-info text-white rounded mb-2 p-2">
                    Invitaciones conformadas<br /><span className="fw-bold fs-5">300</span>
                  </div>
                  <div className="bg-light text-primary rounded p-2">
                    Invitaciones sin confirmar<br /><span className="fw-bold fs-5">200</span>
                  </div>
                </div>
                <div className="mt-3 position-relative" style={{ width: '120px', margin: '0 auto' }}>
                  {/* Para usar datos reales: ajusta doughnutData a los valores del resumen */}
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                  <div className="position-absolute top-50 start-50 translate-middle text-center">
                    {/* Si decides mostrar un score calculado (p. ej. tasa de confirmación): */}
                    {/* const tasa = resumeInvitaciones.confirmadas / (resumeInvitaciones.confirmadas + resumeInvitaciones.noConfirmadas) * 10 */}
                    <div className="fw-bold fs-4 text-info">9.3</div>
                    <div className="text-muted small">Safety</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
