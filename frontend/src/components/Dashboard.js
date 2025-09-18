import React from 'react';
import './style.css';
import Menu from './Menu';

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

function Dashboard({ onNavigate, activeItem }) {
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
      <Menu onNavigate={onNavigate} activeItem={activeItem} />

      {/* Main Content */}
      <main className="flex-grow-1 p-5">
        <h1 className="page-title">Dashboard</h1>
        <h2 className="text-info fw-normal">Bienvenido, usuario</h2>
        
        <div className="col-12">
          <div id="dashboardCarousel" className="carousel slide shadow-sm" data-bs-ride="carousel">
            
            {/* Imágenes del carrusel */}
            <div className="carousel-inner rounded">
              <div className="carousel-item active">
                <img src="/grupo.jpg" className="d-block w-100 mb-3" alt="Imagen 1" />
              </div>
            </div>

          </div>
        </div>
      
        <div className="row g-4">
          <div className="col-12 col-xl-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="fw-bold mb-2">Estado de invitados por evento</div>
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <div className="mb-2">
                  <div className="bg-info text-white rounded mb-2 p-2">
                    Invitaciones confirmadas<br /><span className="fw-bold fs-5">300</span>
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
