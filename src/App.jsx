import { useState } from 'react';
import Iniciosesion from './Paginaspartes/Iniciosecion/Iniciosesion';
import Registrocliente from './Paginaspartes/Iniciosecion/Registrocliente';
import Recuperacioncontrasena from './Paginaspartes/Iniciosecion/Recuperacioncontrasena';

export default function App() {
  const [page, setPage] = useState('login');
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [toast, setToast] = useState('');

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(''), 2600);
  };

  // Acepta un rol directo (útil cuando vienes desde Registrocliente)
  const doLogin = (rolForzado) => {
    const rolActivo = rolForzado || role;
    if (!rolActivo) return;
    const nombres = {
      cliente: 'Ana García',
      conductor: 'Carlos Mendoza',
      admin: 'Administrador'
    };

    setRole(rolActivo);
    setUserName(nombres[rolActivo]);
    setPage('welcome');

    setTimeout(() => {
      if (rolActivo === 'cliente') setPage('dash_cliente');
      else if (rolActivo === 'conductor') setPage('dash_conductor');
      else setPage('dash_admin');
    }, 1800);
  };

  const cerrarSesion = () => {
    setRole('');
    setUserName('');
    setPage('login');
  };

  return (
    <div>
      {/* Notificación Toast flotante */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 999,
          background: 'var(--madera)', color: 'var(--blanco)',
          padding: '12px 18px', borderRadius: '10px',
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--ocre)' }}>check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Vistas de Autenticación */}
      {page === 'login' && (
        <Iniciosesion role={role} setRole={setRole} setPage={setPage} doLogin={doLogin} />
      )}

      {page === 'register' && (
        <Registrocliente setPage={setPage} doLogin={doLogin} />
      )}

      {page === 'recover' && (
        <Recuperacioncontraseña setPage={setPage} mostrarToast={mostrarToast} />
      )}

      {/* Pantalla de Bienvenida */}
      {page === 'welcome' && (
        <div style={{
          minHeight: '100vh', background: 'var(--madera-oscura)', color: 'var(--blanco)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px'
        }}>
          <img src="/imagenes/LOGO.jpg" alt="Logo" style={{ width: '76px', height: '76px', borderRadius: '16px' }} />
          <h2 style={{ fontSize: '24px' }}>Logisty Cargo</h2>
          <p style={{ color: 'var(--topo-claro)' }}>
            Hola, <strong style={{ color: 'var(--ocre)' }}>{userName}</strong> 👋
          </p>
        </div>
      )}

      {/* Placeholder temporal mientras construimos los 3 roles */}
      {['dash_cliente', 'dash_conductor', 'dash_admin'].includes(page) && (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Panel activo: {page} ({userName})</h2>
          <p style={{ margin: '12px 0 20px', color: 'var(--topo)' }}>
            Flujo de autenticación funcionando correctamente.
          </p>
          <button onClick={cerrarSesion} className="btn btn-primario">Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}