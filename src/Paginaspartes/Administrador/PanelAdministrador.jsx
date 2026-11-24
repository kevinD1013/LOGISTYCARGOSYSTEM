import './admin_comun.css';
import './panel_administrador.css';

const ETAPAS_OPERACION = [
  '1. Conductor en camino al origen',
  '2. Cargando inventario en origen',
  '3. En ruta hacia el destino',
  '4. Entrega completada'
];

const formatearCOP = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
};

export default function PanelAdministrador({
  usuarioActual,
  setPage,
  etapaActual = 1,
  serviciosCliente = [],
  novedades = [],
  fallasMecanicas = [],
  facturas = [],
  ticketsSoporte = [],
  clientes = []
}) {
  const totalFacturado = facturas.reduce((acc, f) => acc + f.monto, 0);
  const pendientesAsignar = serviciosCliente.filter(
    (s) => s.estado === 'Programado'
  ).length;
  const alertasTotales = novedades.length + fallasMecanicas.length;
  const ticketsAbiertos = ticketsSoporte.filter(
    (t) => t.estado === 'Abierto'
  ).length;

  return (
    <main className="adm-contenedor">
      <div className="adm-subvista-header">
        <div>
          <p className="adm-codigo-vista">
            Consola de control · {usuarioActual?.nombre || 'Administrador'}
          </p>
          <h1 className="adm-titulo-vista">Panel general de operaciones</h1>
        </div>

        <button
          type="button"
          onClick={() => setPage('ad_asignaciones')}
          className="btn btn-primario"
        >
          <span className="material-symbols-outlined">assignment_ind</span>
          Despachar órdenes ({pendientesAsignar})
        </button>
      </div>

      <section className="padm-kpis">
        <div className="padm-kpi-card">
          <p className="padm-kpi-etiqueta">Órdenes activas / nuevas</p>
          <p className="padm-kpi-valor">{1 + serviciosCliente.length}</p>
          <p className="padm-kpi-sub">{pendientesAsignar} por asignar flota</p>
        </div>

        <div className="padm-kpi-card verde">
          <p className="padm-kpi-etiqueta">Facturación registrada</p>
          <p className="padm-kpi-valor">{formatearCOP(totalFacturado)}</p>
          <p className="padm-kpi-sub">{facturas.length} facturas en sistema</p>
        </div>

        <div className="padm-kpi-card rojo">
          <p className="padm-kpi-etiqueta">Alertas en ruta y taller</p>
          <p className="padm-kpi-valor">{alertasTotales}</p>
          <p className="padm-kpi-sub">
            {novedades.length} vial(es) · {fallasMecanicas.length} mecánica(s)
          </p>
        </div>

        <div className="padm-kpi-card ocre">
          <p className="padm-kpi-etiqueta">Tickets PQRS abiertos</p>
          <p className="padm-kpi-valor">{ticketsAbiertos}</p>
          <p className="padm-kpi-sub">{clientes.length + 1} clientes activos</p>
        </div>
      </section>

      <div className="padm-grid">
        <div className="padm-columna-izq">
          <section className="card padm-tarjeta-operacion">
            <div className="padm-op-header">
              <div>
                <p className="adm-codigo-vista">Monitoreo en vivo · SRV-2026-00852</p>
                <h2 className="padm-op-titulo">Mudanza Residencial (Chapinero → Suba)</h2>
              </div>
              <span className={`badge ${etapaActual === 3 ? 'badge-verde' : 'badge-terra'}`}>
                {ETAPAS_OPERACION[etapaActual]}
              </span>
            </div>

            <div className="padm-op-detalle">
              <div>
                <p className="padm-op-label">Conductor asignado</p>
                <p className="padm-op-dato">Javier Morales</p>
              </div>
              <div>
                <p className="padm-op-label">Vehículo en ruta</p>
                <p className="padm-op-dato">Chevrolet NPR · XYZ-789</p>
              </div>
              <div>
                <p className="padm-op-label">Cliente titular</p>
                <p className="padm-op-dato">Ana García</p>
              </div>
            </div>

            <div className="padm-acciones-op">
              <button
                type="button"
                onClick={() => setPage('ad_servicios')}
                className="btn btn-primario"
              >
                <span className="material-symbols-outlined">inventory_2</span>
                Gestionar todos los servicios
              </button>

              <button
                type="button"
                onClick={() => setPage('ad_vehiculos')}
                className="btn btn-secundario"
              >
                <span className="material-symbols-outlined">local_shipping</span>
                Ver estado de flota
              </button>
            </div>
          </section>

          <section className="card">
            <h2 className="adm-subtitulo-card">Bitácora de novedades y alertas técnicas</h2>

            {alertasTotales === 0 ? (
              <div className="adm-caja-info">
                Sin novedades viales ni fallas mecánicas reportadas en la jornada actual.
              </div>
            ) : (
              <div className="padm-alertas-lista">
                {fallasMecanicas.map((falla, idx) => (
                  <div key={`falla-${idx}`} className="padm-alerta-item critica">
                    <span className="material-symbols-outlined padm-alerta-icono">
                      build_circle
                    </span>
                    <div>
                      <p className="padm-alerta-titulo">
                        Falla Mecánica ({falla.placa || 'XYZ-789'}) · Severidad: {falla.severidad}
                      </p>
                      <p className="padm-alerta-texto">
                        {falla.sistema}: {falla.descripcion} ({falla.hora})
                      </p>
                    </div>
                  </div>
                ))}

                {novedades.map((nov, idx) => (
                  <div key={`nov-${idx}`} className="padm-alerta-item">
                    <span className="material-symbols-outlined padm-alerta-icono">
                      warning
                    </span>
                    <div>
                      <p className="padm-alerta-titulo">
                        Novedad en ruta · {nov.tipo} ({nov.hora})
                      </p>
                      <p className="padm-alerta-texto">{nov.detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="padm-columna-der">
          <div className="card">
            <h2 className="adm-subtitulo-card">Módulos de administración</h2>

            <div className="padm-modulos-lista">
              <button
                type="button"
                onClick={() => setPage('ad_asignaciones')}
                className="padm-modulo-btn"
              >
                <div className="padm-modulo-izq">
                  <div className="padm-modulo-icono">
                    <span className="material-symbols-outlined">assignment_ind</span>
                  </div>
                  <div>
                    <p className="padm-modulo-titulo">Despacho y asignaciones</p>
                    <p className="padm-modulo-desc">
                      Asigna conductor y camión a solicitudes nuevas
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              <button
                type="button"
                onClick={() => setPage('ad_conductores')}
                className="padm-modulo-btn"
              >
                <div className="padm-modulo-izq">
                  <div className="padm-modulo-icono verde">
                    <span className="material-symbols-outlined">badge</span>
                  </div>
                  <div>
                    <p className="padm-modulo-titulo">Gestión de conductores</p>
                    <p className="padm-modulo-desc">
                      Licencias, disponibilidad y turnos del equipo
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              <button
                type="button"
                onClick={() => setPage('ad_vehiculos')}
                className="padm-modulo-btn"
              >
                <div className="padm-modulo-izq">
                  <div className="padm-modulo-icono ocre">
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  <div>
                    <p className="padm-modulo-titulo">Flota y mantenimiento</p>
                    <p className="padm-modulo-desc">
                      Control de camiones, SOAT, tecnomecánica y taller
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              <button
                type="button"
                onClick={() => setPage('ad_clientes')}
                className="padm-modulo-btn"
              >
                <div className="padm-modulo-izq">
                  <div className="padm-modulo-icono">
                    <span className="material-symbols-outlined">group</span>
                  </div>
                  <div>
                    <p className="padm-modulo-titulo">Clientes y soporte PQRS</p>
                    <p className="padm-modulo-desc">
                      Directorio registrado y resolución de tickets
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              <button
                type="button"
                onClick={() => setPage('ad_reportes')}
                className="padm-modulo-btn"
              >
                <div className="padm-modulo-izq">
                  <div className="padm-modulo-icono verde">
                    <span className="material-symbols-outlined">bar_chart</span>
                  </div>
                  <div>
                    <p className="padm-modulo-titulo">Reportes e indicadores</p>
                    <p className="padm-modulo-desc">
                      Ingresos por ruta, cumplimiento y recaudo
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>

              <button
                type="button"
                onClick={() => setPage('ad_configuracion')}
                className="padm-modulo-btn"
              >
                <div className="padm-modulo-izq">
                  <div className="padm-modulo-icono ocre">
                    <span className="material-symbols-outlined">settings</span>
                  </div>
                  <div>
                    <p className="padm-modulo-titulo">Tarifas y configuración</p>
                    <p className="padm-modulo-desc">
                      Precios base por vehículo y parámetros operativos
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}