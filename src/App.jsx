import { useState, useEffect } from 'react';

// Listas editables solo desde código
import { ADMINISTRADORES } from './datos/administradores';
import { CONDUCTORES } from './datos/conductores';

// Módulo Autenticación
import Iniciosesion from './Paginaspartes/Iniciosecion/Iniciosesion';
import Registrocliente from './Paginaspartes/Iniciosecion/Registrocliente';
import Recuperacioncontrasena from './Paginaspartes/Iniciosecion/Recuperacioncontrasena';

// Módulo Conductor (Cabecera y 8 vistas)
import HeaderConductor from './componentes/HeaderConductor';
import PanelConductor from './Paginaspartes/Conductor/PanelConductor';
import ParadaActual from './Paginaspartes/Conductor/ParadaActual';
import ChecklistCarga from './Paginaspartes/Conductor/ChecklistCarga';
import GpsNavegacion from './Paginaspartes/Conductor/GpsNavegacion';
import MiVehiculo from './Paginaspartes/Conductor/MiVehiculo';
import ReportarNovedad from './Paginaspartes/Conductor/ReportarNovedad';
import ReportarProblemaMecanico from './Paginaspartes/Conductor/ReportarProblemaMecanico';
import HistorialConductor from './Paginaspartes/Conductor/HistorialConductor';

// Módulo Cliente (Cabecera y 7 vistas)
import HeaderCliente from './componentes/HeaderCliente';
import PanelCliente from './Paginaspartes/Cliente/PanelCliente';
import Cotizacion from './Paginaspartes/Cliente/Cotizacion';
import SolicitarServicio from './Paginaspartes/Cliente/SolicitarServicio';
import SeguimientoServicio from './Paginaspartes/Cliente/SeguimientoServicio';
import MisServicios from './Paginaspartes/Cliente/MisServicios';
import Pagos from './Paginaspartes/Cliente/Pagos';
import Soporte from './Paginaspartes/Cliente/Soporte';

// Módulo Administrador (Cabecera y 8 vistas)
import HeaderAdministrador from './componentes/HeaderAdministrador';
import PanelAdministrador from './Paginaspartes/Administrador/PanelAdministrador';
import Servicios from './Paginaspartes/Administrador/Servicios';
import Asignaciones from './Paginaspartes/Administrador/Asignaciones';
import Conductores from './Paginaspartes/Administrador/Conductores';
import Vehiculos from './Paginaspartes/Administrador/Vehiculos';
import Clientes from './Paginaspartes/Administrador/Clientes';
import Reportes from './Paginaspartes/Administrador/Reportes';
import Configuracion from './Paginaspartes/Administrador/Configuracion';

const INVENTARIO_INICIAL = [
  { id: 1, nombre: 'Sofá modular 3 puestos', categoria: 'Sala / Comedor', marcado: true },
  { id: 2, nombre: 'Nevera Nevecón Samsung', categoria: 'Electrodoméstico', marcado: true },
  { id: 3, nombre: 'Comedor madera 6 puestos', categoria: 'Sala / Comedor', marcado: false },
  { id: 4, nombre: 'Cama Queen + Base cama', categoria: 'Alcoba', marcado: false },
  { id: 5, nombre: '14 Cajas selladas y etiquetadas', categoria: 'Cajas / Embalaje', marcado: false }
];

const FACTURAS_INICIALES = [
  {
    codigo: 'FAC-2026-0411',
    servicio: 'SRV-2026-00852',
    concepto: 'Mudanza Residencial (Chapinero → Suba)',
    fecha: '2026-11-20',
    monto: 335000,
    estado: 'Pendiente'
  },
  {
    codigo: 'FAC-2026-0389',
    servicio: 'SRV-2026-00815',
    concepto: 'Transporte de Carga Puntual — Bogotá D.C.',
    fecha: '2026-10-28',
    monto: 195000,
    estado: 'Pagado',
    metodo: 'PSE · Débito bancario'
  },
  {
    codigo: 'FAC-2026-0354',
    servicio: 'SRV-2026-00762',
    concepto: 'Mudanza Residencial (Bogotá → Chía)',
    fecha: '2026-09-14',
    monto: 340000,
    estado: 'Pagado',
    metodo: 'Tarjeta Crédito / Débito'
  }
];

const TICKETS_INICIALES = [
  {
    codigo: 'TKT-2026-0123',
    cliente: 'Ana García',
    orden: 'SRV-2026-00852',
    categoria: 'Actualización de direcciones o inventario',
    asunto: 'Autorización de parqueadero en torre destino',
    mensaje: 'Ya quedó radicado el permiso en la portería de Suba para el camión NPR.',
    fecha: '20/11/2026',
    estado: 'Resuelto'
  }
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

const PAGINAS_CLIENTE = [
  'dash_cliente',
  'cl_servicios',
  'cl_cotizacion',
  'cl_solicitar',
  'cl_seguimiento',
  'cl_pagos',
  'cl_soporte'
];

const PAGINAS_ADMIN = [
  'dash_admin',
  'ad_servicios',
  'ad_asignaciones',
  'ad_conductores',
  'ad_vehiculos',
  'ad_clientes',
  'ad_reportes',
  'ad_configuracion'
];

export default function App() {
  const [page, setPage] = useState('login');
  const [role, setRole] = useState('');
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [toast, setToast] = useState('');

// Estados operativos compartidos (guardados en localStorage)
  const [etapaActual, setEtapaActual] = useState(() => {
    const guardada = localStorage.getItem('lc_etapa');
    return guardada ? Number(guardada) : 1;
  });

  const [inventario, setInventario] = useState(() => {
    const guardado = localStorage.getItem('lc_inventario');
    return guardado ? JSON.parse(guardado) : INVENTARIO_INICIAL;
  });

  const [novedades, setNovedades] = useState(() => {
    const guardadas = localStorage.getItem('lc_novedades');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [fallasMecanicas, setFallasMecanicas] = useState(() => {
    const guardadas = localStorage.getItem('lc_fallas');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  // Estados del flujo del Cliente (guardados en localStorage)
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);

  const [serviciosCliente, setServiciosCliente] = useState(() => {
    const guardados = localStorage.getItem('lc_servicios');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [facturas, setFacturas] = useState(() => {
    const guardadas = localStorage.getItem('lc_facturas');
    return guardadas ? JSON.parse(guardadas) : FACTURAS_INICIALES;
  });

  const [ticketsSoporte, setTicketsSoporte] = useState(() => {
    const guardados = localStorage.getItem('lc_tickets');
    return guardados ? JSON.parse(guardados) : TICKETS_INICIALES;
  });

  // Estados del Administrador y Clientes (guardados en localStorage)
  const [conductoresLista, setConductoresLista] = useState(() => {
    const guardados = localStorage.getItem('lc_conductores');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [vehiculosFlota, setVehiculosFlota] = useState(() => {
    const guardados = localStorage.getItem('lc_vehiculos');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [clientes, setClientes] = useState(() => {
    const guardados = localStorage.getItem('lc_clientes');
    return guardados ? JSON.parse(guardados) : [];
  });

  // Guarda automáticamente cualquier cambio en el navegador
  useEffect(() => {
    localStorage.setItem('lc_etapa', String(etapaActual));
    localStorage.setItem('lc_inventario', JSON.stringify(inventario));
    localStorage.setItem('lc_novedades', JSON.stringify(novedades));
    localStorage.setItem('lc_fallas', JSON.stringify(fallasMecanicas));
    localStorage.setItem('lc_servicios', JSON.stringify(serviciosCliente));
    localStorage.setItem('lc_facturas', JSON.stringify(facturas));
    localStorage.setItem('lc_tickets', JSON.stringify(ticketsSoporte));
    localStorage.setItem('lc_conductores', JSON.stringify(conductoresLista));
    localStorage.setItem('lc_vehiculos', JSON.stringify(vehiculosFlota));
    localStorage.setItem('lc_clientes', JSON.stringify(clientes));
  }, [
    etapaActual,
    inventario,
    novedades,
    fallasMecanicas,
    serviciosCliente,
    facturas,
    ticketsSoporte,
    conductoresLista,
    vehiculosFlota,
    clientes
  ]);
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
    else if (role === 'conductor') listaDelRol = [...CONDUCTORES, ...conductoresLista];
    else if (role === 'admin') listaDelRol = ADMINISTRADORES;

    const encontrado = listaDelRol.find(
      (u) =>
        u.correo &&
        u.password &&
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
      setPage('dash_cliente');
    } else {
      setPage('dash_admin');
    }
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    setRole('');
    setPage('login');
  };

  return (
    <div>
      {toast && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 999,
          background: 'var(--madera)', color: 'var(--blanco)',
          padding: '12px 18px', borderRadius: '10px',
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--ocre)' }}>info</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Módulo Autenticación */}
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

      {/* Módulo Completo del Conductor */}
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

      {/* Módulo Completo del Cliente */}
      {PAGINAS_CLIENTE.includes(page) && usuarioActual && (
        <div>
          <HeaderCliente
            page={page}
            setPage={setPage}
            usuarioActual={usuarioActual}
            cerrarSesion={cerrarSesion}
          />

          {page === 'dash_cliente' && (
            <PanelCliente
              usuarioActual={usuarioActual}
              setPage={setPage}
              etapaActual={etapaActual}
              novedades={novedades}
              serviciosCliente={serviciosCliente}
              facturas={facturas}
            />
          )}

          {page === 'cl_cotizacion' && (
            <Cotizacion
              setPage={setPage}
              setCotizacionSeleccionada={setCotizacionSeleccionada}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'cl_solicitar' && (
            <SolicitarServicio
              setPage={setPage}
              usuarioActual={usuarioActual}
              cotizacionSeleccionada={cotizacionSeleccionada}
              serviciosCliente={serviciosCliente}
              setServiciosCliente={setServiciosCliente}
              facturas={facturas}
              setFacturas={setFacturas}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'cl_seguimiento' && (
            <SeguimientoServicio
              setPage={setPage}
              etapaActual={etapaActual}
              inventario={inventario}
              novedades={novedades}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'cl_servicios' && (
            <MisServicios
              setPage={setPage}
              usuarioActual={usuarioActual}
              serviciosCliente={serviciosCliente}
              etapaActual={etapaActual}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'cl_pagos' && (
            <Pagos
              setPage={setPage}
              usuarioActual={usuarioActual}
              facturas={facturas}
              setFacturas={setFacturas}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'cl_soporte' && (
            <Soporte
              setPage={setPage}
              usuarioActual={usuarioActual}
              serviciosCliente={serviciosCliente}
              ticketsSoporte={ticketsSoporte}
              setTicketsSoporte={setTicketsSoporte}
              mostrarToast={mostrarToast}
            />
          )}
        </div>
      )}

      {/* Módulo Completo del Administrador */}
      {PAGINAS_ADMIN.includes(page) && usuarioActual && (
        <div>
          <HeaderAdministrador
            page={page}
            setPage={setPage}
            usuarioActual={usuarioActual}
            cerrarSesion={cerrarSesion}
          />

          {page === 'dash_admin' && (
            <PanelAdministrador
              usuarioActual={usuarioActual}
              setPage={setPage}
              etapaActual={etapaActual}
              serviciosCliente={serviciosCliente}
              novedades={novedades}
              fallasMecanicas={fallasMecanicas}
              facturas={facturas}
              ticketsSoporte={ticketsSoporte}
              clientes={clientes}
            />
          )}

          {page === 'ad_servicios' && (
            <Servicios
              setPage={setPage}
              serviciosCliente={serviciosCliente}
              etapaActual={etapaActual}
              setEtapaActual={setEtapaActual}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'ad_asignaciones' && (
            <Asignaciones
              setPage={setPage}
              serviciosCliente={serviciosCliente}
              setServiciosCliente={setServiciosCliente}
              vehiculosFlota={vehiculosFlota}
              conductoresLista={conductoresLista}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'ad_conductores' && (
            <Conductores
              setPage={setPage}
              conductoresLista={conductoresLista}
              setConductoresLista={setConductoresLista}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'ad_vehiculos' && (
            <Vehiculos
              setPage={setPage}
              vehiculosFlota={vehiculosFlota}
              setVehiculosFlota={setVehiculosFlota}
              fallasMecanicas={fallasMecanicas}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'ad_clientes' && (
            <Clientes
              setPage={setPage}
              clientes={clientes}
              ticketsSoporte={ticketsSoporte}
              setTicketsSoporte={setTicketsSoporte}
              serviciosCliente={serviciosCliente}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'ad_reportes' && (
            <Reportes
              setPage={setPage}
              facturas={facturas}
              serviciosCliente={serviciosCliente}
              etapaActual={etapaActual}
              novedades={novedades}
              fallasMecanicas={fallasMecanicas}
              mostrarToast={mostrarToast}
            />
          )}

          {page === 'ad_configuracion' && (
            <Configuracion
              setPage={setPage}
              usuarioActual={usuarioActual}
              mostrarToast={mostrarToast}
            />
          )}
        </div>
      )}
    </div>
  );
}