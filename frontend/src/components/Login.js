import React, { useState } from 'react';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí va la lógica de autenticación
    setMensaje('Funcionalidad de login pendiente');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#043474',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '80%', marginTop: '40px', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/logo.jpg" alt="Logo" style={{ width: '400px', marginBottom: '20px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
        
        <div style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '40px 30px',
          marginLeft: '60px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          minWidth: '320px'
        }}>
          <h2 style={{ textAlign: 'center', color: '#0a3972', marginBottom: '30px' }}>INICIO DE SESION</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '20px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              background: '#2196f3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Ingresar
            </button>
          </form>
          {mensaje && <p style={{ color: 'red', marginTop: '15px' }}>{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;