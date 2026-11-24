import { useState } from 'react';
import './admin_comun.css';
import './vehiculos.css';

const FLOTA_INICIAL = [
  {
    placa: 'XYZ-789',
    modelo: 'Chevrolet NPR (3.5 Ton)',
    anio: '2023',
    capacidad: '3.5 Ton · 22 m³',
    soat: 'Vigente · Ago 2027',
    tecno: 'Vigente · Sep 2027',
    conductorFijo: 'Javier Morales',
    kilometraje: '48.320 km',
    estado: 'En ruta'
  },
  {
    placa: 'KLM-456',
    modelo: 'Furgón NHR (2.5 Ton)',
    anio: '2022',
    capacidad: '2.5 Ton · 16 m³',
    soat: 'Vigente · May 2027',
    tecno: 'Vigente · Jun 2027',
    conductorFijo: 'Carlos Méndez',
    kilometraje: '61.910 km',
    estado: 'Disponible'
  },
  {
    placa: 'JTR-912',
    modelo: 'Camión FVR (6.0 Ton)',
    anio: '2024',
    capacidad: '6.0 Ton · 36 m³',
    soat: 'Vigente · Nov 2027',
    tecno: 'Vigente · Dic 2027',
    conductorFijo: 'Andrés Villalobos',
    kilometraje: '29.450 km',
    estado: 'Disponible'
  },
  {
    placa: 'WQP-304',
    modelo: 'Chevrolet NKR (3.0 Ton)',
    anio: '2021',
    capacidad: '3.0 Ton · 19 m³',
    soat: 'Vigente · Mar 2027',
    tecno: 'Vigente · Abr 2027',
    conductorFijo: 'Sin asignar',
    kilometraje: '84.105 km',
    estado: 'En taller'
  }
];

export default function Vehiculos({
  setPage,
  vehiculosFlota,
  setVehiculosFlota,
  fallasMecanicas = [],
  mostrarToast
}) {
  const [flotaLocal, setFlotaLocal] = useState(FLOTA_INICIAL);
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('Chevrolet NPR (3.5 Ton)');
  const [anio, setAnio] = useState('2025');
  const [capacidad, setCapacidad] = useState('3.5 Ton · 22 m³');
  const [conductorFijo, setConductorFijo] = useState('Carlos Méndez');

  const flotaActiva =
    vehiculosFlota && vehiculosFlota.length > 0 ? vehiculosFlota : flotaLocal;

  const guardarCambiosFlota = (nuevaFlota) => {
    setFlotaLocal(nuevaFlota);
    if (setVehiculosFlota) {
      setVehiculosFlota(nuevaFlota);
    }
  };

  const cambiarEstadoVehiculo = (placaObjetivo) => {
    const estados = ['Disponible', 'En ruta', 'En taller'];
    const actualizada = flotaActiva.map((veh) => {
      if (veh.placa !== placaObjetivo) return veh;
      const idxActual = estados.indexOf(veh.estado);
      const siguiente = estados[(idxActual + 1) % estados.length];
      mostrarToast(`Unidad ${veh.placa} cambiada a estado: ${siguiente}`);
      return { ...veh, estado: siguiente };
    });

    guardarCambiosFlota(actualizada);
  };

  const registrarVehiculo = (e) => {
    e.preventDefault();
    const placaLimpia = placa.trim().toUpperCase();
    if (!placaLimpia) return;

    const existe = flotaActiva.some((v) => v.placa === placaLimpia);
    if (existe) {
      mostrarToast(`La placa ${placaLimpia} ya se encuentra registrada`);
      return;
    }

    const nuevaUnidad = {
      placa: placaLimpia,
      modelo,
      anio: anio.trim() || '2025',
      capacidad,
      soat: 'Vigente · Nov 2027',
      tecno: 'Vigente · Nov 2027',
      conductorFijo,
      kilometraje: '1.200 km',
      estado: 'Disponible'
    };

    guardarCambiosFlota([nuevaUnidad, ...flotaActiva]);
    setPlaca('');
    mostrarToast(`Vehículo ${placaLimpia} incorporado a la flota activa`);
  };

  const obtenerBadge = (estado) => {
    if (estado === 'Disponible') return 'badge-verde';
    if (estado === 'En ruta') return 'badge-terra';
    return 'badge-rojo';
  };

  const obtenerClaseBorde = (estado) => {
    if (estado === 'En ruta') return 'en-ruta';
    if (estado === 'En taller') return 'en-taller';
    return '';
  };

  const flotaFiltrada =
    filtroEstado === 'Todos'
      ? flotaActiva
      : flotaActiva.filter((v) => v.estado === filtroEstado);

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
              Parque automotor · {flotaActiva.length} unidades registradas
            </p>
            <h1 className="adm-titulo-vista">Flota y mantenimiento vehicular</h1>
          </div>
        </div>

        <span className="badge badge-verde">
          {flotaActiva.filter((v) => v.estado === 'Disponible').length} unidad(es) disponible(s)
        </span>
      </div>

      <div className="aveh-grid">
        <section>
          <div className="aveh-filtros">
            {['Todos', 'Disponible', 'En ruta', 'En taller'].map((estado) => (
              <button
                key={estado}
                type="button"
                onClick={() => setFiltroEstado(estado)}
                className={`aveh-filtro-btn ${filtroEstado === estado ? 'activo' : ''}`}
              >
                {estado}
              </button>
            ))}
          </div>

          <div className="aveh-lista">
            {flotaFiltrada.map((veh) => {
              const fallaReportada = fallasMecanicas.find(
                (f) => (f.placa || 'XYZ-789') === veh.placa
              );

              return (
                <article
                  key={veh.placa}
                  className={`card aveh-card ${obtenerClaseBorde(veh.estado)}`}
                >
                  <div className="aveh-card-top">
                    <div className="aveh-identidad">
                      <span className="aveh-placa-badge">{veh.placa}</span>
                      <div>
                        <h2 className="aveh-modelo">{veh.modelo}</h2>
                        <p className="aveh-subdato">
                          Modelo {veh.anio} · {veh.capacidad}
                        </p>
                      </div>
                    </div>

                    <span className={`badge ${obtenerBadge(veh.estado)}`}>
                      {veh.estado}
                    </span>
                  </div>

                  {fallaReportada && (
                    <div className="aveh-alerta-falla">
                      <span className="material-symbols-outlined">build_circle</span>
                      <div>
                        <strong>
                          Reporte mecánico activo ({fallaReportada.severidad}):{' '}
                        </strong>
                        <span>
                          {fallaReportada.sistema} — {fallaReportada.descripcion}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="aveh-meta-grid">
                    <div>
                      <p className="aveh-meta-label">Conductor habitual</p>
                      <p className="aveh-meta-valor">{veh.conductorFijo}</p>
                    </div>
                    <div>
                      <p className="aveh-meta-label">SOAT</p>
                      <p className="aveh-meta-valor">{veh.soat}</p>
                    </div>
                    <div>
                      <p className="aveh-meta-label">Tecnomecánica</p>
                      <p className="aveh-meta-valor">{veh.tecno}</p>
                    </div>
                    <div>
                      <p className="aveh-meta-label">Capacidad útil</p>
                      <p className="aveh-meta-valor">{veh.capacidad}</p>
                    </div>
                  </div>

                  <div className="aveh-footer">
                    <span className="aveh-kilometraje">
                      Odómetro: {veh.kilometraje}
                    </span>

                    <button
                      type="button"
                      onClick={() => cambiarEstadoVehiculo(veh.placa)}
                      className="btn btn-secundario"
                    >
                      <span className="material-symbols-outlined">build</span>
                      Cambiar estado operativo
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="card aveh-tarjeta-form">
          <h2 className="adm-subtitulo-card">Incorporar nuevo vehículo</h2>

          <form onSubmit={registrarVehiculo}>
            <div className="aveh-fila-doble adm-campo">
              <div>
                <label className="lbl">Placa del vehículo</label>
                <input
                  className="inp"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  placeholder="Ej. LMN-842"
                  maxLength={7}
                  required
                />
              </div>

              <div>
                <label className="lbl">Año / Modelo</label>
                <input
                  className="inp"
                  value={anio}
                  onChange={(e) => setAnio(e.target.value)}
                  placeholder="Ej. 2025"
                  required
                />
              </div>
            </div>

            <div className="adm-campo">
              <label className="lbl">Referencia y carrocería</label>
              <select
                className="inp"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              >
                <option>Furgón NHR (2.5 Ton)</option>
                <option>Chevrolet NKR (3.0 Ton)</option>
                <option>Chevrolet NPR (3.5 Ton)</option>
                <option>Camión FVR (6.0 Ton)</option>
              </select>
            </div>

            <div className="aveh-fila-doble adm-campo">
              <div>
                <label className="lbl">Capacidad de carga</label>
                <select
                  className="inp"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                >
                  <option>2.5 Ton · 16 m³</option>
                  <option>3.0 Ton · 19 m³</option>
                  <option>3.5 Ton · 22 m³</option>
                  <option>6.0 Ton · 36 m³</option>
                </select>
              </div>

              <div>
                <label className="lbl">Conductor titular</label>
                <select
                  className="inp"
                  value={conductorFijo}
                  onChange={(e) => setConductorFijo(e.target.value)}
                >
                  <option>Carlos Méndez</option>
                  <option>Javier Morales</option>
                  <option>Andrés Villalobos</option>
                  <option>Sin asignar</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primario adm-btn-full">
              <span className="material-symbols-outlined">add_road</span>
              Registrar unidad en flota
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}