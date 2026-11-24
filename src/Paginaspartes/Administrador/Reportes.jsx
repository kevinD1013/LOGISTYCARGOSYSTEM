import { useState } from 'react';
import './admin_comun.css';
import './reportes.css';

const formatearCOP = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
};

export default function Reportes({
  setPage,
  facturas = [],
  serviciosCliente = [],
  etapaActual = 1,
  novedades = [],
  fallasMecanicas = [],
  mostrarToast
}) {
  const [periodo, setPeriodo] = useState('Noviembre 2026');

  const totalPagado = facturas
    .filter((f) => f.estado === 'Pagado')
    .reduce((acc, f) => acc + f.monto, 0);

  const totalPendiente = facturas
    .filter((f) => f.estado === 'Pendiente')
    .reduce((acc, f) => acc + f.monto, 0);

  const totalBruto = totalPagado + totalPendiente;
  const serviciosCerrados = 2 + (etapaActual === 3 ? 1 : 0);
  const serviciosActivos = serviciosCliente.length + (etapaActual < 3 ? 1 : 0);
  const tasaPuntualidad = novedades.length === 0 ? '98.4%' : '94.6%';

  const desgloseLineas = [
    {
      nombre: 'Mudanzas Residenciales Urbanas (Bogotá)',
      monto: 340000 + 335000,
      porcentaje: 68,
      ordenes: `${2 + serviciosCliente.length} servicios`,
      claseBarra: ''
    },
    {
      nombre: 'Transporte de Carga Puntual y Empresarial',
      monto: 195000,
      porcentaje: 21,
      ordenes: '1 servicio',
      claseBarra: 'terra'
    },
    {
      nombre: 'Servicios Adicionales (Embalaje y Auxiliares)',
      monto: 110000,
      porcentaje: 11,
      ordenes: 'Complementos incluidos',
      claseBarra: 'ocre'
    }
  ];

  const rendimientoEquipo = [
    {
      nombre: 'Andrés Villalobos',
      unidad: 'Camión FVR · JTR-912',
      viajes: '31 viajes',
      calificacion: '5.0 ★ · Sin novedades'
    },
    {
      nombre: 'Javier Morales',
      unidad: 'Chevrolet NPR · XYZ-789',
      viajes: '28 viajes',
      calificacion: '4.9 ★ · En operación'
    },
    {
      nombre: 'Carlos Méndez',
      unidad: 'Furgón NHR · KLM-456',
      viajes: '24 viajes',
      calificacion: '4.8 ★ · Disponible'
    }
  ];

  const exportarReporte = () => {
    mostrarToast(`Reporte ejecutivo (${periodo}) exportado en formato PDF/CSV`);
  };

  return (
    <main className="adm-contenedor">
      <div className="adm-subvista-header">
        <div className="adm-subvista-izq">
          <button
            type="button"
            onClick={() => setPage('dash_admin')}
            className="adm-btn-volver"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Volver al Panel
          </button>
          <div>
            <p className="adm-codigo-vista">
              Analítica operativa · Corte {periodo}
            </p>
            <h1 className="adm-titulo-vista">Reportes financieros y de operación</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={exportarReporte}
          className="btn btn-primario"
        >
          <span className="material-symbols-outlined">download</span>
          Exportar reporte ejecutivo
        </button>
      </div>

      <div className="arep-controles">
        <div className="arep-periodos">
          {['Noviembre 2026', 'Octubre 2026', 'Trimestre 2026-Q4'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriodo(item)}
              className={`arep-periodo-btn ${periodo === item ? 'activo' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>

        <span className="badge badge-verde">Datos sincronizados en tiempo real</span>
      </div>

      <section className="arep-kpis">
        <div className="arep-kpi-card">
          <p className="arep-kpi-label">Recaudo efectivo (Pagado)</p>
          <p className="arep-kpi-valor">{formatearCOP(totalPagado)}</p>
          <p className="arep-kpi-sub">Ingresos confirmados en caja</p>
        </div>

        <div className="arep-kpi-card terra">
          <p className="arep-kpi-label">Cartera por cobrar</p>
          <p className="arep-kpi-valor">{formatearCOP(totalPendiente)}</p>
          <p className="arep-kpi-sub">Facturas pendientes de pago</p>
        </div>

        <div className="arep-kpi-card ocre">
          <p className="arep-kpi-label">Facturación bruta total</p>
          <p className="arep-kpi-valor">{formatearCOP(totalBruto)}</p>
          <p className="arep-kpi-sub">
            {serviciosCerrados} cerrado(s) · {serviciosActivos} activo(s)
          </p>
        </div>

        <div className="arep-kpi-card">
          <p className="arep-kpi-label">Cumplimiento de ruta</p>
          <p className="arep-kpi-valor">{tasaPuntualidad}</p>
          <p className="arep-kpi-sub">
            {novedades.length} novedad(es) · {fallasMecanicas.length} falla(s)
          </p>
        </div>
      </section>

      <div className="arep-grid">
        <div className="arep-columna-izq">
          <section className="card arep-tarjeta-ingresos">
            <h2 className="adm-subtitulo-card">
              Distribución de ingresos por línea de servicio
            </h2>

            <div className="arep-barras-lista">
              {desgloseLineas.map((linea, idx) => (
                <div key={idx} className="arep-barra-item">
                  <div className="arep-barra-top">
                    <span className="arep-barra-titulo">{linea.nombre}</span>
                    <span className="arep-barra-monto">
                      {formatearCOP(linea.monto)}
                    </span>
                  </div>

                  <div className="arep-barra-track">
                    <div
                      className={`arep-barra-fill ${linea.claseBarra}`}
                      style={{ width: `${linea.porcentaje}%` }}
                    />
                  </div>

                  <div className="arep-barra-pie">
                    <span>{linea.ordenes}</span>
                    <span>{linea.porcentaje}% del volumen</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="arep-columna-der">
          <section className="card arep-tarjeta-flota">
            <h2 className="adm-subtitulo-card">Desempeño por conductor</h2>

            <div className="arep-rendimiento-lista">
              {rendimientoEquipo.map((cond, idx) => (
                <div key={idx} className="arep-conductor-fila">
                  <div>
                    <p className="arep-conductor-nombre">{cond.nombre}</p>
                    <p className="arep-conductor-unidad">{cond.unidad}</p>
                  </div>
                  <div className="arep-conductor-datos">
                    <p className="arep-conductor-viajes">{cond.viajes}</p>
                    <p className="arep-conductor-nota">{cond.calificacion}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2 className="adm-subtitulo-card">Indicadores de calidad y flota</h2>

            <div className="arep-resumen-calidad">
              <div className="arep-calidad-fila">
                <span>Satisfacción promedio del cliente</span>
                <span className="badge badge-verde">4.9 / 5.0 ★</span>
              </div>
              <div className="arep-calidad-fila">
                <span>Disponibilidad de camiones</span>
                <span className="badge badge-ocre">75% operativa</span>
              </div>
              <div className="arep-calidad-fila">
                <span>Incidentes mecánicos abiertos</span>
                <span className="badge badge-terra">
                  {fallasMecanicas.length} reporte(s)
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}