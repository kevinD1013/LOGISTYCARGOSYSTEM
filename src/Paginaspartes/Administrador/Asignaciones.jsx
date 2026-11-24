import { useState } from 'react';
import { CONDUCTORES } from '../../datos/conductores';
import './admin_comun.css';
import './asignaciones.css';

const FLOTA_DISPONIBLE = [
  { placa: 'XYZ-789', modelo: 'Chevrolet NPR (3.5 Ton)', estado: 'En ruta' },
  { placa: 'KLM-456', modelo: 'Furgón NHR (2.5 Ton)', estado: 'Disponible' },
  { placa: 'JTR-912', modelo: 'Camión FVR (6.0 Ton)', estado: 'Disponible' },
  { placa: 'WQP-304', modelo: 'Chevrolet NKR (3.0 Ton)', estado: 'Disponible' }
];

const EQUIPO_BASE = [
  { nombre: 'Javier Morales', licencia: 'C2 · Vigente' },
  { nombre: 'Carlos Méndez', licencia: 'C2 · Vigente' },
  { nombre: 'Andrés Villalobos', licencia: 'C3 · Vigente' }
];

export default function Asignaciones({
  setPage,
  serviciosCliente = [],
  setServiciosCliente,
  vehiculosFlota,
  conductoresLista,
  mostrarToast
}) {
  const listaConductores =
    conductoresLista && conductoresLista.length > 0
      ? conductoresLista
      : [...CONDUCTORES, ...EQUIPO_BASE].filter(
          (item, index, self) =>
            index === self.findIndex((c) => c.nombre === item.nombre)
        );

  const listaVehiculos =
    vehiculosFlota && vehiculosFlota.length > 0
      ? vehiculosFlota.filter((v) => v.estado !== 'En taller')
      : FLOTA_DISPONIBLE;

  const ordenesDespachables = [
    ...serviciosCliente,
    {
      codigo: 'SRV-2026-00852',
      titulo: 'Mudanza Residencial — Bogotá D.C.',
      fecha: '2026-11-20',
      origen: 'Cra 15 # 93-40 (Chapinero)',
      destino: 'Calle 127 # 45-12 (Suba)',
      vehiculo: 'Camión NPR (3.5 Ton)',
      conductor: 'Javier Morales',
      placa: 'XYZ-789',
      estado: 'En curso'
    }
  ];

  const primeraPendiente =
    ordenesDespachables.find((o) => o.placa === 'Pendiente') ||
    ordenesDespachables[0];

  const [codigoOrden, setCodigoOrden] = useState(primeraPendiente.codigo);
  const [conductorElegido, setConductorElegido] = useState(
    listaConductores[1]?.nombre || listaConductores[0]?.nombre || 'Carlos Méndez'
  );
  const [placaElegida, setPlacaElegida] = useState(
    listaVehiculos[1]?.placa || listaVehiculos[0]?.placa || 'KLM-456'
  );
  const [observacionDespacho, setObservacionDespacho] = useState('');

  const ordenSeleccionada =
    ordenesDespachables.find((o) => o.codigo === codigoOrden) ||
    ordenesDespachables[0];

  const vehiculoObjeto =
    listaVehiculos.find((v) => v.placa === placaElegida) || listaVehiculos[0];

  const confirmarAsignacion = (e) => {
    e.preventDefault();
    if (!ordenSeleccionada) return;

    if (setServiciosCliente) {
      const actualizados = serviciosCliente.map((srv) =>
        srv.codigo === ordenSeleccionada.codigo
          ? {
              ...srv,
              conductor: conductorElegido,
              placa: vehiculoObjeto.placa,
              vehiculo: vehiculoObjeto.modelo,
              estado: 'En curso'
            }
          : srv
      );
      setServiciosCliente(actualizados);
    }

    mostrarToast(
      `Orden ${ordenSeleccionada.codigo} asignada a ${conductorElegido} (${vehiculoObjeto.placa})`
    );
    setObservacionDespacho('');
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
            <p className="adm-codigo-vista">Centro de despacho · Flota y personal</p>
            <h1 className="adm-titulo-vista">Asignación de conductores y vehículos</h1>
          </div>
        </div>

        <span className="badge badge-ocre">
          {ordenesDespachables.filter((o) => o.placa === 'Pendiente').length} pendiente(s) de flota
        </span>
      </div>

      <div className="asig-grid">
        <section className="card asig-tarjeta-despacho">
          <h2 className="adm-subtitulo-card">1. Selecciona la orden a despachar</h2>

          <div className="asig-pendientes-lista">
            {ordenesDespachables.map((orden) => {
              const sinAsignar = orden.placa === 'Pendiente';
              const activa = ordenSeleccionada?.codigo === orden.codigo;

              return (
                <button
                  key={orden.codigo}
                  type="button"
                  onClick={() => setCodigoOrden(orden.codigo)}
                  className={`asig-orden-btn ${activa ? 'seleccionada' : ''}`}
                >
                  <div>
                    <p className="asig-orden-codigo">
                      {orden.codigo} · Fecha: {orden.fecha}
                    </p>
                    <p className="asig-orden-titulo">{orden.titulo}</p>
                    <p className="asig-orden-ruta">
                      {orden.origen} → {orden.destino}
                    </p>
                  </div>

                  <span className={`badge ${sinAsignar ? 'badge-ocre' : 'badge-verde'}`}>
                    {sinAsignar ? 'Sin asignar' : orden.placa}
                  </span>
                </button>
              );
            })}
          </div>

          <form onSubmit={confirmarAsignacion}>
            <h2 className="adm-subtitulo-card">2. Asigna recursos operativos</h2>

            <div className="asig-fila-doble cli-campo">
              <div>
                <label className="lbl">Conductor responsable</label>
                <select
                  className="inp"
                  value={conductorElegido}
                  onChange={(e) => setConductorElegido(e.target.value)}
                >
                  {listaConductores.map((cond, idx) => (
                    <option key={idx} value={cond.nombre}>
                      {cond.nombre} ({cond.licencia || 'Licencia C2'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="lbl">Vehículo de flota</label>
                <select
                  className="inp"
                  value={placaElegida}
                  onChange={(e) => setPlacaElegida(e.target.value)}
                >
                  {listaVehiculos.map((veh) => (
                    <option key={veh.placa} value={veh.placa}>
                      {veh.placa} · {veh.modelo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="adm-campo">
              <label className="lbl">Instrucciones de despacho para el conductor</label>
              <input
                className="inp"
                value={observacionDespacho}
                onChange={(e) => setObservacionDespacho(e.target.value)}
                placeholder="Ej. Presentarse 15 min antes en portería con 2 auxiliares..."
              />
            </div>

            <div className="asig-resumen-previo">
              <strong>Resumen del despacho: </strong>
              La orden <strong>{ordenSeleccionada?.codigo}</strong> quedará operada por{' '}
              <strong>{conductorElegido}</strong> en el vehículo{' '}
              <strong>
                {vehiculoObjeto?.modelo} ({vehiculoObjeto?.placa})
              </strong>
              .
            </div>

            <button type="submit" className="btn btn-primario adm-btn-full">
              <span className="material-symbols-outlined">check_circle</span>
              Confirmar asignación y notificar
            </button>
          </form>
        </section>

        <aside className="card asig-tarjeta-activas">
          <h2 className="adm-subtitulo-card">Estado actual de despachos</h2>

          <div className="asig-activas-lista">
            {ordenesDespachables.map((orden) => {
              const pendiente = orden.placa === 'Pendiente';

              return (
                <article
                  key={orden.codigo}
                  className={`asig-activa-card ${pendiente ? 'pendiente' : ''}`}
                >
                  <div className="asig-activa-top">
                    <span className="asig-orden-codigo">{orden.codigo}</span>
                    <span className={`badge ${pendiente ? 'badge-ocre' : 'badge-terra'}`}>
                      {orden.estado}
                    </span>
                  </div>
                  <p className="asig-activa-titulo">{orden.titulo}</p>
                  <div className="asig-activa-meta">
                    <span>
                      <strong>Conductor:</strong> {orden.conductor}
                    </span>
                    <span>
                      <strong>Vehículo:</strong> {orden.vehiculo} ({orden.placa})
                    </span>
                    <span>
                      <strong>Ruta:</strong> {orden.origen} → {orden.destino}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
}