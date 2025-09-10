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

function Dashboard({ onNavigate }) {
  // 📊 Datos del gráfico de línea (estado de invitados)
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
          <div className="col-md-4">
            <div className="stats-card">
              <div className="stats-label">
                Eventos creados <i className="fa-solid fa-calendar-days"></i>
              </div>
              <div className="stats-number">#eventos</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stats-card">
              <div className="stats-label">
                Invitaciones enviadas <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="stats-number">#invitaciones</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stats-card">
              <div className="stats-label">
                Confirmaciones <i className="fa-solid fa-check"></i>
              </div>
              <div className="stats-number">#confirmaciones</div>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="fw-bold mb-2">Estado de invitados por evento</div>
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <div className="mb-2">
                  <div className="bg-info text-white rounded mb-2 p-2">
                    Invitaciones conformadas<br /><span className="fw-bold fs-5">300</span>
                  </div>
                  <div className="bg-light text-primary rounded p-2">
                    Invitaciones sin confirmar<br /><span className="fw-bold fs-5">200</span>
                  </div>
                </div>
                <div className="mt-3 position-relative" style={{ width: '120px', margin: '0 auto' }}>
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                  <div className="position-absolute top-50 start-50 translate-middle text-center">
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
