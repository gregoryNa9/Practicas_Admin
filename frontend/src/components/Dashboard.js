import React from 'react';

function Dashboard() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside style={{ background: '#043474', color: '#fff', width: '220px', padding: '1.5rem' }}>
        <div className="text-center mb-4">
          <img src="/logo.jpg" alt="Logo" style={{ width: '150px' }} />
        </div>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a className="nav-link active text-white" href="#">
                <i className="fa-solid fa-house me-2"></i>Dashboard
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <i className="fa-solid fa-calendar-days me-2"></i>Eventos
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <i className="fa-solid fa-envelope me-2"></i>Invitaciones
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <i className="fa-solid fa-check me-2"></i>Confirmaciones
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <i className="fa-solid fa-file me-2"></i>Reportes
              </a>
            </li>
            <li className="nav-item mt-4">
              <a className="nav-link text-white" href="#">
                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Salir
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-5">
        <h1 className="text-primary fw-bold">Dashboard</h1>
        <h2 className="text-info fw-normal">Bienvenido, usuario</h2>
        <div className="row my-4 g-4">
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <div className="mb-2">
                  Eventos creados <i className="fa-solid fa-calendar-days"></i>
                </div>
                <div className="text-info fw-bold fs-4">#eventos</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <div className="mb-2">
                  Invitaciones enviadas <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="text-info fw-bold fs-4">#invitaciones</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <div className="mb-2">
                  Confirmaciones <i className="fa-solid fa-check"></i>
                </div>
                <div className="text-info fw-bold fs-4">#confirmaciones</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="fw-bold mb-2">Estado de invitados por evento</div>
                <div style={{ height: '120px', background: 'linear-gradient(180deg, #00bfff33 60%, #fff 100%)', borderRadius: '10px' }}></div>
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
                <div className="mt-3">
                  <div className="fw-bold fs-2 text-info">9.3</div>
                  <div className="text-muted">Total Score</div>
                  <svg width="80" height="80" style={{ marginTop: '10px' }}>
                    <circle cx={40} cy={40} r={35} stroke="#00bfff" strokeWidth={8} fill="none" strokeDasharray={220} strokeDashoffset={40} />
                  </svg>
                  <div className="text-info fw-bold mt-2">Safety</div>
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