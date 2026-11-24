import { useState } from 'react';
import './admin_comun.css';
import './servicios.css';

const HISTORICO_ADMIN = [
  {
    codigo: 'SRV-2026-00815',
    cliente: 'Ana García',
    titulo: 'Transporte de Carga Puntual — Bogotá D.C.',
    fecha: '2026-10-28',
    origen: 'Av. El Dorado # 68C-61',
    destino: 'Cra 7 # 116-50',
    vehiculo: 'Furgón NHR (2.5 Ton)',
    conductor: 'Carlos Méndez',
    placa: 'KLM-456',
    valor: 195000,
    estado: 'Completado'
  },
  {
    codigo: 'SRV-2026-00762',
    cliente: 'Ana García',
    titulo: 'Mudanza Residencial — Chía / Sabana',
    fecha: '2026-09-14',
    origen: 'Calle 80 # 102-15',
    destino: 'Conjunto Robledal Casa 14 (Chía)',
    vehiculo: 'Camión NPR (3.5 Ton)',
    conductor: 'Javier Morales',
    placa: 'XYZ-789',
    valor: 340000,
    estado: 'Completado'
  }
];

const formatearCOP = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
};

export default function Servicios({
  setPage,
  serviciosCliente = [],
  etapaActual = 1,
  setEtapaActual,
  mostrarToast
}) {
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const nuevasOrdenes = serviciosCliente.map((srv) => ({
    ...srv,
    cliente: srv.cliente || 'Ana García'
  }));

  const ordenActiva = {
    codigo: 'SRV-2026-00852',
    cliente: 'Ana García',
    titulo: 'Mudanza Residencial — Bogotá D.C.',
    fecha: '2026-11-20',
    origen: 'Cra 15 # 93-40 (Chapinero)',
    destino: 'Calle 127 # 45-12 (Suba)',
    vehiculo: 'Camión NPR (3.5 Ton)',
    conductor: 'Javier Morales',
    placa: 'XYZ-789',
    valor: 335000,
    estado: etapaActual === 3 ? 'Completado' : 'En curso'
  };

  const catalogoServicios = [
    ...nuevasOrdenes,
    ordenActiva,
    ...HISTORICO_ADMIN
  ];

  const serviciosFiltrados = catalogoServicios.filter((srv) => {
    const coincideEstado =
      filtroEstado === 'Todos' || srv.estado === filtroEstado;
    const texto = busqueda.trim().toLowerCase();
    const coincideTexto =
      !texto ||
      srv.codigo.toLowerCase().includes(texto) ||
      srv.cliente.toLowerCase().includes(texto) ||
      srv.origen.toLowerCase().includes(texto) ||
      srv.destino.toLowerCase().includes(texto);

    return coincideEstado && coincideTexto;
  });

  const avanzarEtapaAdmin = () => {
    if (!setEtapaActual || etapaActual >= 3) return;
    const siguiente = etapaActual + 1;
    setEtapaActual(siguiente);
    mostrarToast(`Etapa de SRV-2026-00852 actualizada a fase ${siguiente + 1} de 4`);
  };

  const obtenerBadge = (estado) => {
    if (estado === 'En curso') return 'badge-terra';
    if (estado === 'Programado') return 'badge-ocre';
    return 'badge-verde';
  };

  const obtenerClaseBorde = (estado) => {
    if (estado === 'En curso') return 'en-curso';
    if (estado === 'Completado') return 'completado';
    return '';
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
              Control operativo · {catalogoServicios.length} órdenes registradas
            </p>
            <h1 className="adm-titulo-vista">Gestión general de servicios</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPage('ad_asignaciones')}
          className="btn btn-primario"
        >
          <span className="material-symbols-outlined">assignment_ind</span>
          Ir a despacho y asignaciones
        </button>
      </div>

      <div className="asrv-controles">
        <div className="asrv-buscador">
          <input
            className="inp"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por código, cliente o dirección..."
          />
        </div>

        <div className="asrv-filtros">
          {['Todos', 'Programado', 'En curso', 'Completado'].map((estado) => (
            <button
              key={estado}
              type="button"
              onClick={() => setFiltroEstado(estado)}
              className={`asrv-filtro-btn ${filtroEstado === estado ? 'activo' : ''}`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {serviciosFiltrados.length === 0 ? (
        <div className="asrv-vacio">
          No se encontraron órdenes que coincidan con los filtros aplicados.
        </div>
      ) : (
        <div className="asrv-lista">
          {serviciosFiltrados.map((srv) => (
            <article
              key={srv.codigo}
              className={`card asrv-card ${obtenerClaseBorde(srv.estado)}`}
            >
              <div className="asrv-top">
                <div>
                  <p className="asrv-codigo">
                    {srv.codigo} · Cliente: <strong>{srv.cliente}</strong>
                  </p>
                  <h2 className="asrv-titulo">{srv.titulo}</h2>
                  <p className="asrv-subfecha">Fecha programada: {srv.fecha}</p>
                </div>

                <span className={`badge ${obtenerBadge(srv.estado)}`}>
                  {srv.estado}
                </span>
              </div>

              <div className="asrv-datos-grid">
                <div>
                  <p className="asrv-dato-label">Vehículo</p>
                  <p className="asrv-dato-valor">{srv.vehiculo}</p>
                </div>
                <div>
                  <p className="asrv-dato-label">Conductor / Placa</p>
                  <p className="asrv-dato-valor">
                    {srv.conductor} ({srv.placa})
                  </p>
                </div>
                <div>
                  <p className="asrv-dato-label">Trayecto</p>
                  <p className="asrv-dato-valor">
                    {srv.origen} → {srv.destino}
                  </p>
                </div>
                <div>
                  <p className="asrv-dato-label">Valor del servicio</p>
                  <p className="asrv-dato-precio">{formatearCOP(srv.valor)}</p>
                </div>
              </div>

              <div className="asrv-footer">
                <span className="asrv-ruta-resumen">
                  {srv.estado === 'Programado'
                    ? 'Requiere asignación de unidad y conductor antes del despacho'
                    : srv.estado === 'En curso'
                    ? 'Operación monitoreada en tiempo real'
                    : 'Servicio cerrado y acta digital archivada'}
                </span>

                <div className="asrv-acciones">
                  {srv.estado === 'Programado' && (
                    <button
                      type="button"
                      onClick={() => setPage('ad_asignaciones')}
                      className="btn btn-primario"
                    >
                      <span className="material-symbols-outlined">assignment_ind</span>
                      Asignar flota
                    </button>
                  )}

                  {srv.codigo === 'SRV-2026-00852' && etapaActual < 3 && (
                    <button
                      type="button"
                      onClick={avanzarEtapaAdmin}
                      className="btn btn-secundario"
                    >
                      <span className="material-symbols-outlined">fast_forward</span>
                      Avanzar etapa operativa
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}