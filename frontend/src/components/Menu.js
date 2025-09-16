import React from 'react';

function Menu({ onNavigate, activeItem }) {
  const menuItems = [
    { key: 'dashboard', icon: 'fa-house', label: 'Dashboard' },
    { key: 'eventos', icon: 'fa-calendar-days', label: 'Eventos' },
    { key: 'invitaciones', icon: 'fa-envelope', label: 'Invitaciones' },
    { key: 'confirmaciones', icon: 'fa-check', label: 'Confirmaciones' },
    { key: 'reportes', icon: 'fa-file', label: 'Reportes' },
    { key: 'new-user', icon: 'fa-user-plus', label: 'Nuevo Usuario' }
  ];

  return (
    <aside className="sidebar">
      <div className="text-center mb-4">
        <img src="/logo.jpg" alt="Logo" className="sidebar-logo" />
      </div>
      <nav>
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.key} className="nav-item mb-2">
              <button 
                className={`nav-link sidebar-nav-item btn btn-link p-2 text-start w-100 ${
                  activeItem === item.key ? 'active' : ''
                }`} 
                onClick={() => onNavigate(item.key)}
              >
                <i className={`fa-solid ${item.icon} me-2`}></i>
                {item.label}
              </button>
            </li>
          ))}
          <li className="nav-item mt-4">
            <button 
              className="nav-link sidebar-nav-item btn btn-link p-2 text-start w-100" 
              onClick={() => onNavigate('login')}
            >
              <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
              Salir
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Menu;
