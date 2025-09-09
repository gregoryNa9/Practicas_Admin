import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Invitaciones from './components/invitaciones';
import Eventos from './components/eventos';
import Confirmaciones from './components/Confirmaciones';
import NewEvento from './components/New-evento';
import FormRegistro from './components/Form-registro';
import Reportes from './components/Reportes';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'dashboard', 'invitaciones', 'eventos', 'confirmaciones'

  // Función para manejar la navegación
  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  // Renderizar vista actual
  if (currentView === 'login') {
    return <Login onLogin={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onNavigate={handleNavigation} />;
  }

  if (currentView === 'invitaciones') {
    return <Invitaciones onNavigate={handleNavigation} />;
  }

  if (currentView === 'eventos') {
    return <Eventos onNavigate={handleNavigation} />;
  }

  if (currentView === 'new-evento') {
    return <NewEvento onNavigate={handleNavigation} />;
  }

  if (currentView === 'form-registro') {
    return <FormRegistro onNavigate={handleNavigation} />;
  }

  if (currentView === 'confirmaciones') {
    return <Confirmaciones onNavigate={handleNavigation} />;
  }

  if (currentView === 'reportes') {
    return <Reportes onNavigate={handleNavigation} />;
  }
  return <Login onLogin={() => setCurrentView('dashboard')} />;
}

export default App;
