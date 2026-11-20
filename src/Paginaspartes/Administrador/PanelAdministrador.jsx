// 1. Importamos la hoja de estilos exclusiva de este panel (estamos en JavaScript normal, aquí sí sirve //)
import './panel_administrador.css';


export default function PanelAdministrador({ usuarioActual, usuarios, setPage }) {
  
 
  return (
    <main className="panel-admin-wrapper">
      
      {/* ── ENCABEZADO SUPERIOR ── */}
      <div className="panel-admin-header">
        <div>
          <h1 style={{ fontSize: '26px' }}>Centro de Control — Oficina</h1>
          <p style={{ fontSize: '13px', color: 'var(--topo)', marginTop: '4px' }}>
            {/* Usamos ?. (Optional Chaining) para leer nombre y correo sin error si usuarioActual es null */}
            Sesión iniciada como <strong>{usuarioActual?.nombre}</strong> ({usuarioActual?.correo})
          </p>
        </div>

        {/* Al hacer clic, la función flecha ejecuta setPage para navegar a Asignaciones */}
        <button onClick={() => setPage('ad_asignaciones')} className="btn btn-primario">
          <span className="material-symbols-outlined">add</span>
          Nueva asignación
        </button>
      </div>

      {/* ── TARJETAS DE MÉTRICAS (KPIs) ── */}
      <section className="panel-admin-kpis">
        <div className="card admin-kpi-card">
          <p className="admin-kpi-titulo">Servicios hoy</p>
          <p className="admin-kpi-valor">12</p>
          <p className="admin-kpi-sub">4 en ruta actualmente</p>
        </div>

        <div className="card admin-kpi-card verde">
          <p className="admin-kpi-titulo">Flota disponible</p>
          <p className="admin-kpi-valor">11 / 16</p>
          <p className="admin-kpi-sub">Camiones operativos</p>
        </div>

        <div className="card admin-kpi-card ocre">
          <p className="admin-kpi-titulo">Usuarios activos</p>
          {/* .length cuenta dinámicamente cuántos elementos tiene el arreglo usuarios */}
          <p className="admin-kpi-valor">{usuarios.length}</p>
          <p className="admin-kpi-sub">Registrados en el sistema</p>
        </div>

        <div className="card admin-kpi-card rojo">
          <p className="admin-kpi-titulo">Ingresos del día</p>
          <p className="admin-kpi-valor">$4.8M</p>
          <p className="admin-kpi-sub">+14% frente a ayer</p>
        </div>
      </section>

      {/* ── CUADRÍCULA INFERIOR: TABLA DE USUARIOS + ACCESOS RÁPIDOS ── */}
      <section className="panel-admin-grid">
        
        {/* Columna izquierda: Tabla de cuentas */}
        <div className="card">
          <h2 style={{ fontSize: '17px' }}>Cuentas registradas en el sistema</h2>
          <p style={{ fontSize: '12px', color: 'var(--topo)', marginTop: '2px' }}>
            Lectura en vivo desde administradores, conductores y clientes guardados
          </p>

          <table className="tabla-admin-usuarios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {/* .map() recorre el arreglo usuarios y crea una fila <tr> por cada cuenta */}
              {/* key={idx} le da un identificador único a cada fila para el Virtual DOM */}
              {usuarios.map((u, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>
                    {/* Template literal: une la clase fija 'badge-rol' con el rol dinámico ('admin', 'conductor' o 'cliente') */}
                    <span className={`badge-rol ${u.rol}`}>
                      {/* .toUpperCase() convierte el texto a mayúsculas */}
                      {u.rol.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Columna derecha: Botones de navegación rápida */}
        <div className="card">
          <h2 style={{ fontSize: '17px', marginBottom: '12px' }}>Accesos rápidos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setPage('ad_servicios')} className="btn btn-secundario" style={{ justifyContent: 'flex-start' }}>
              <span className="material-symbols-outlined">receipt_long</span> Gestionar servicios
            </button>
            <button onClick={() => setPage('ad_asignaciones')} className="btn btn-secundario" style={{ justifyContent: 'flex-start' }}>
              <span className="material-symbols-outlined">assignment_ind</span> Asignar rutas
            </button>
            <button onClick={() => setPage('ad_vehiculos')} className="btn btn-secundario" style={{ justifyContent: 'flex-start' }}>
              <span className="material-symbols-outlined">local_shipping</span> Control de vehículos
            </button>
            <button onClick={() => setPage('ad_conductores')} className="btn btn-secundario" style={{ justifyContent: 'flex-start' }}>
              <span className="material-symbols-outlined">badge</span> Equipo de conductores
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}