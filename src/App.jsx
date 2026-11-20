
import { useState, useEffect } from 'react';

// Listas editables solo desde código
import { ADMINISTRADORES } from './datos/administradores';
import { CONDUCTORES } from './datos/conductores';

// Módulo Autenticación
import Iniciosesion from './Paginaspartes/Iniciosecion/Iniciosesion';
import Registrocliente from './Paginaspartes/Iniciosecion/Registrocliente';
import Recuperacioncontrasena from './Paginaspartes/Iniciosecion/Recuperacioncontrasena';

// Módulo Conductor
import HeaderConductor from './componentes/HeaderConductor';
import PanelConductor from './Paginaspartes/Conductor/PanelConductor';
import ParadaActual from './Paginaspartes/Conductor/ParadaActual';
import ChecklistCarga from './Paginaspartes/Conductor/ChecklistCarga';
import GpsNavegacion from './Paginaspartes/Conductor/GpsNavegacion';
import MiVehiculo from './Paginaspartes/Conductor/MiVehiculo';
import ReportarNovedad from './Paginaspartes/Conductor/ReportarNovedad';
import ReportarProblemaMecanico from './Paginaspartes/Conductor/ReportarProblemaMecanico';
import HistorialConductor from './Paginaspartes/Conductor/HistorialConductor';

// Módulo Cliente
import Cotizacion from './Paginaspartes/Cliente/Cotizacion';
import MisServicios from './Paginaspartes/Cliente/MisServicios';
import Pagos from './Paginaspartes/Cliente/Pagos';
import PanelCliente from './Paginaspartes/Cliente/PanelCliente';
import SeguimientoServicio from './Paginaspartes/Cliente/SeguimientoServicio';
import SolicitarServicio from './Paginaspartes/Cliente/SolicitarServicio';
import Soporte from './Paginaspartes/Cliente/Soporte';

const INVENTARIO_INICIAL = [
  { id: 1, nombre: 'Sofá modular 3 puestos', categoria: 'Sala / Comedor', marcado: true },
  { id: 2, nombre: 'Nevera Nevecón Samsung', categoria: 'Electrodoméstico', marcado: true },
  { id: 3, nombre: 'Comedor madera 6 puestos', categoria: 'Sala / Comedor', marcado: false },
  { id: 4, nombre: 'Cama Queen + Base cama', categoria: 'Alcoba', marcado: false },
  { id: 5, nombre: '14 Cajas selladas y etiquetadas', categoria: 'Cajas / Embalaje', marcado: false }
];

const PAGINAS_CONDUCTOR = [
  'dash_conductor',
  'co_parada',
  'co_checklist',
  'co_gps',
  'co_vehiculo',
  'co_novedad',
  'co_mecanico',
  'co_historial'
];

// Páginas del Cliente
const PAGINAS_CLIENTE = [
  'cliente_panel',
  'cliente_servicios',
  'cliente_pagos',
  'cliente_cotizacion',
  'cliente_seguimiento',
  'cliente_solicitar',
  'cliente_soporte'
];

export default function App() {
  const [page, setPage] = useState('login');
  const [role, setRole] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [toast, setToast] = useState('');

  // Estados compartidos del Conductor
  const [etapaActual, setEtapaActual] = useState(1);
  const [inventario, setInventario] = useState(INVENTARIO_INICIAL);
  const [novedades, setNovedades] = useState([]);
  const [fallasMecanicas, setFallasMecanicas] = useState([]);

  // Clientes registrados
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

  // Registrar cliente
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

  // Inicio de sesión según el rol
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

    if (encontrado.rol === 'conductor') {
      setPage('dash_conductor');
    } else if (encontrado.rol === 'cliente') {
      setPage('cliente_panel');
    } else {
      setPage('panel');
    }
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    setUsuarioActual(null);
    setRole('');
    setPage('login');
  };

  return (
    <div>
      {/* Mensajes */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999,
          background: 'var(--madera)',
          color: 'var(--blanco)',
          padding: '12px 18px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--ocre)' }}>
            info
          </span>
          <span>{toast}</span>
        </div>
      )}

      {/* AUTENTICACIÓN */}
      {page === 'login' && (
        <Iniciosesion
          role={role}
          setRole={setRole}
          setPage={setPage}
          doLogin={doLogin}
        />
      )}

      {page === 'register' && (
        <Registrocliente
          setPage={setPage}
          registrarCliente={registrarCliente}
          mostrarToast={mostrarToast}
        />
      )}

      {page === 'recover' && (
        <Recuperacioncontrasena
          setPage={setPage}
          mostrarToast={mostrarToast}
        />
      )}

      {/* MÓDULO CONDUCTOR */}
      {PAGINAS_CONDUCTOR.includes(page) && usuarioActual && (
        <div>
          <HeaderConductor
            page={page}
            setPage={setPage}
            usuarioActual={usuarioActual}
            cerrarSesion={cerrarSesion}
            mostrarToast={mostrarToast}
          />

          {page === 'dash_conductor' && (
            <PanelConductor
              usuarioActual={usuarioActual}
              setPage={setPage}
              etapaActual={etapaActual}
              inventario={inventario}
              novedades={novedades}
              fallasMecanicas={fallasMecanicas}
            />
          )}

          {page === 'co_parada' && (
            <ParadaActual
              setPage={setPage}
              etapaActual={etapaActual}
              setEtapaActual={setEtapaActual}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'co_checklist' && (
            <ChecklistCarga
              setPage={setPage}
              inventario={inventario}
              setInventario={setInventario}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'co_gps' && (
            <GpsNavegacion
              setPage={setPage}
              usuarioActual={usuarioActual}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'co_vehiculo' && (
            <MiVehiculo
              setPage={setPage}
              usuarioActual={usuarioActual}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'co_novedad' && (
            <ReportarNovedad
              setPage={setPage}
              usuarioActual={usuarioActual}
              novedades={novedades}
              setNovedades={setNovedades}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'co_mecanico' && (
            <ReportarProblemaMecanico
              setPage={setPage}
              usuarioActual={usuarioActual}
              fallasMecanicas={fallasMecanicas}
              setFallasMecanicas={setFallasMecanicas}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'co_historial' && (
            <HistorialConductor
              setPage={setPage}
              usuarioActual={usuarioActual}
              etapaActual={etapaActual}
            />
          )}
        </div>
      )}

      {/* MÓDULO CLIENTE */}
      {PAGINAS_CLIENTE.includes(page) && usuarioActual && (
        <div>
          {/* Menú de navegación del Cliente */}
          <nav style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
            padding: '15px 25px',
            background: 'var(--madera)',
            color: 'var(--blanco)'
          }}>
            <strong style={{ marginRight: '15px' }}>
              LOGISTY CARGO - CLIENTE
            </strong>

            <button onClick={() => setPage('cliente_panel')}>
              Inicio
            </button>

            <button onClick={() => setPage('cliente_servicios')}>
              Mis servicios
            </button>

            <button onClick={() => setPage('cliente_solicitar')}>
              Solicitar servicio
            </button>

            <button onClick={() => setPage('cliente_cotizacion')}>
              Cotización
            </button>

            <button onClick={() => setPage('cliente_seguimiento')}>
              Seguimiento
            </button>

            <button onClick={() => setPage('cliente_pagos')}>
              Pagos
            </button>

            <button onClick={() => setPage('cliente_soporte')}>
              Soporte
            </button>

            <button
              onClick={cerrarSesion}
              style={{ marginLeft: 'auto' }}
            >
              Cerrar sesión
            </button>
          </nav>

          {/* Vistas del Cliente */}
          {page === 'cliente_panel' && <PanelCliente />}

          {page === 'cliente_servicios' && <MisServicios />}

          {page === 'cliente_pagos' && <Pagos />}

          {page === 'cliente_cotizacion' && <Cotizacion />}

          {page === 'cliente_seguimiento' && <SeguimientoServicio />}

          {page === 'cliente_solicitar' && <SolicitarServicio />}

          {page === 'cliente_soporte' && <Soporte />}
        </div>
      )}

      {/* PANEL TEMPORAL ADMINISTRADOR */}
      {page === 'panel' && usuarioActual && (
        <div
          style={{
            padding: '40px',
            maxWidth: '500px',
            margin: '60px auto'
          }}
          className="card"
        >
          <h2>Sesión iniciada</h2>

          <p style={{ margin: '10px 0' }}>
            <strong>Nombre:</strong> {usuarioActual.nombre}
          </p>

          <p style={{ margin: '10px 0' }}>
            <strong>Correo:</strong> {usuarioActual.correo}
          </p>

          <p style={{ margin: '10px 0 20px' }}>
            <strong>Rol activo:</strong> {usuarioActual.rol.toUpperCase()}
          </p>

          <button onClick={cerrarSesion} className="btn btn-primario">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
