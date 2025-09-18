import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Invitaciones from './components/invitaciones';
import Eventos from './components/eventos';
import Confirmaciones from './components/Confirmaciones';
import NewEvento from './components/New-evento';
import FormRegistro from './components/Form-registro';
import Reportes from './components/Reportes';
import Historial from './components/Historial';
import NewUser from './components/New-User';
import ListaInvitados from './components/Lista-invitados';
import EditarEvento from './components/Editar-evento';

function App() {
  const [currentView, setCurrentView] = useState('login'); // Vista inicial: login

  // Función para manejar la navegación entre vistas
  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  // ────────────────────────────────
  // Renderizar vistas según currentView
  // ────────────────────────────────
  if (currentView === 'login') {
    return <Login onLogin={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'dashboard') {
    return <Dashboard onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'invitaciones') {
    return <Invitaciones onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'eventos') {
    return <Eventos onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'new-evento') {
    return <NewEvento onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'form-registro') {
    return <FormRegistro onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'confirmaciones') {
    return <Confirmaciones onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'reportes') {
    return <Reportes onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'historial') {
    return <Historial onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'new-user') {
    return <NewUser onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'lista-invitados') {
    return <ListaInvitados onNavigate={handleNavigation} activeItem={currentView} />;
  }

  if (currentView === 'editar-evento') {
    return <EditarEvento onNavigate={handleNavigation} activeItem={currentView} />;
  }

  // Vista por defecto (seguridad adicional)
  return <Login onLogin={() => setCurrentView('dashboard')} />;
}

export default App;
