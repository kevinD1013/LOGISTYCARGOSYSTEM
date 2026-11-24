import './header_administrador.css';

const PESTANAS_ADMIN = [
  { id: 'dash_admin', icono: 'dashboard', texto: 'Panel' },
  { id: 'ad_servicios', icono: 'inventory_2', texto: 'Servicios' },
  { id: 'ad_asignaciones', icono: 'assignment_ind', texto: 'Asignaciones' },
  { id: 'ad_conductores', icono: 'badge', texto: 'Conductores' },
  { id: 'ad_vehiculos', icono: 'local_shipping', texto: 'Vehículos' },
  { id: 'ad_clientes', icono: 'group', texto: 'Clientes' },
  { id: 'ad_reportes', icono: 'bar_chart', texto: 'Reportes' },
  { id: 'ad_configuracion', icono: 'settings', texto: 'Configuración' }
];

export default function HeaderAdministrador({
  page,
  setPage,
  usuarioActual,
  cerrarSesion
}) {
  const obtenerIniciales = (nombre = 'AD') => {
    return nombre
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase() || '')
      .join('');
  };

  return (
    <header className="hadm-header">
      <div className="hadm-superior">
        <div className="hadm-usuario-bloque">
          <div className="hadm-avatar">
            {obtenerIniciales(usuarioActual?.nombre || 'Admin General')}
          </div>
          <div>
            <p className="hadm-nombre">
              {usuarioActual?.nombre || 'Administrador General'}
            </p>
            <p className="hadm-subtitulo">
              Centro de Operaciones · Logisty Cargo Bogotá
            </p>
          </div>
        </div>

        <div className="hadm-acciones">
          <span className="hadm-estado-pill">
            <span className="hadm-punto-activo" />
            Operación en línea
          </span>

          <button
            type="button"
            onClick={cerrarSesion}
            className="hadm-btn-salir"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar sesión
          </button>
        </div>
      </div>

      <nav className="hadm-nav-barra">
        <div className="hadm-nav-contenedor">
          {PESTANAS_ADMIN.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPage(tab.id)}
              className={`hadm-tab ${page === tab.id ? 'activa' : ''}`}
            >
              <span className="material-symbols-outlined">{tab.icono}</span>
              <span>{tab.texto}</span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}