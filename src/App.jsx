import { useState, useEffect } from 'react';

import { ADMINISTRADORES } from './datos/administradores';
import { CONDUCTORES } from './datos/conductores';

import Iniciosesion from './Paginaspartes/Iniciosecion/Iniciosesion';
import Registrocliente from './Paginaspartes/Iniciosecion/Registrocliente';
import Recuperacioncontrasena from './Paginaspartes/Iniciosecion/Recuperacioncontrasena';

import NavbarAdmin from './componentes/NavbarAdmin';
import PanelAdministrador from './Paginaspartes/Administrador/PanelAdministrador';

export default function App() {
  const [page, setPage] = useState('login');
  const [role, setRole] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [toast, setToast] = useState('');

  const [clientes, setClientes] = useState(() => {
    const guardados = localStorage.getItem('lc_clientes');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('lc_clientes', JSON.stringify(clientes));
  }, [clientes]);

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(''), 3000);
  };

  const registrarCliente = (nuevoCliente) => {
    const correoLimpio = nuevoCliente.correo.toLowerCase();
    const existe = [...clientes, ...ADMINISTRADORES, ...CONDUCTORES].some(
      (u) => u.correo.toLowerCase() === correoLimpio
    );

    if (existe) {
      mostrarToast('Ese correo ya está registrado');
      return false;
    }

    setClientes([...clientes, { ...nuevoCliente, rol: 'cliente' }]);
    setRole('cliente');
    mostrarToast('Cliente registrado. Ahora inicia sesión');
    return true;
  };

  const doLogin = (correoIngresado, passwordIngresada) => {
    if (!role) {
      mostrarToast('Selecciona primero un rol');
      return;
    }

    let listaDelRol = [];
    if (role === 'cliente') listaDelRol = clientes;
    else if (role === 'conductor') listaDelRol = CONDUCTORES;
    else if (role === 'admin') listaDelRol = ADMINISTRADORES;

    const encontrado = listaDelRol.find(
      (u) =>
        u.correo.toLowerCase() === correoIngresado.trim().toLowerCase() &&
        u.password === passwordIngresada
    );

    if (!encontrado) {
      mostrarToast(`Usuario no encontrado o contraseña incorrecta para ${role}`);
      return;
    }

    setUsuarioActual(encontrado);
    if (role === 'admin') setPage('dash_admin');
    else setPage('panel');
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    setRole('');
    setPage('login');
  };

  const todosLosUsuarios = [...ADMINISTRADORES, ...CONDUCTORES, ...clientes];
  const paginasAdmin = ['dash_admin', 'ad_servicios', 'ad_asignaciones', 'ad_vehiculos', 'ad_conductores', 'ad_clientes'];

  return (
    <div>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 999,
          background: 'var(--madera)', color: 'var(--blanco)',
          padding: '12px 18px', borderRadius: '10px',
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--ocre)' }}>info</span>
          <span>{toast}</span>
        </div>
      )}

      {page === 'login' && (
        <Iniciosesion role={role} setRole={setRole} setPage={setPage} doLogin={doLogin} />
      )}

      {page === 'register' && (
        <Registrocliente setPage={setPage} registrarCliente={registrarCliente} mostrarToast={mostrarToast} />
      )}

      {page === 'recover' && (
        <Recuperacioncontrasena setPage={setPage} mostrarToast={mostrarToast} />
      )}

      {/* Módulo Administrador */}
      {paginasAdmin.includes(page) && usuarioActual && (
        <div>
          <NavbarAdmin
            page={page}
            setPage={setPage}
            usuarioActual={usuarioActual}
            cerrarSesion={cerrarSesion}
          />

          {page === 'dash_admin' && (
            <PanelAdministrador
              usuarioActual={usuarioActual}
              usuarios={todosLosUsuarios}
              setPage={setPage}
            />
          )}

          {page !== 'dash_admin' && (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h2>Subsección de Oficina: {page}</h2>
              <p style={{ color: 'var(--topo)', margin: '8px 0 18px' }}>
                Esta vista la construiremos en los siguientes bloques.
              </p>
              <button onClick={() => setPage('dash_admin')} className="btn btn-primario">
                Volver al Dashboard
              </button>
            </div>
          )}
        </div>
      )}

      {/* Temporal para Cliente y Conductor */}
      {page === 'panel' && usuarioActual && (
        <div style={{ padding: '40px', maxWidth: '500px', margin: '60px auto' }} className="card">
          <h2>Sesión iniciada</h2>
          <p style={{ margin: '10px 0' }}><strong>Nombre:</strong> {usuarioActual.nombre}</p>
          <p style={{ margin: '10px 0' }}><strong>Correo:</strong> {usuarioActual.correo}</p>
          <p style={{ margin: '10px 0 20px' }}><strong>Rol activo:</strong> {usuarioActual.rol.toUpperCase()}</p>
          <button onClick={cerrarSesion} className="btn btn-primario">Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}