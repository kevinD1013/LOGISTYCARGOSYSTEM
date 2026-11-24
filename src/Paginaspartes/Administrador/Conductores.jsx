import { useState } from 'react';
import { CONDUCTORES } from '../../datos/conductores';
import './admin_comun.css';
import './conductores.css';

const CONDUCTORES_BASE = [
  {
    id: 'COND-01',
    nombre: 'Javier Morales',
    correo: 'javier.morales@logisty.com',
    documento: 'CC 1.022.418.903',
    telefono: '310 489 2210',
    licencia: 'C2 · Vigente 2028',
    vehiculoAsignado: 'XYZ-789 (NPR)',
    serviciosMes: 28,
    calificacion: '4.9 ★',
    estado: 'En ruta'
  },
  {
    id: 'COND-02',
    nombre: 'Carlos Méndez',
    correo: 'carlos.mendez@logisty.com',
    documento: 'CC 80.745.112',
    telefono: '314 620 8841',
    licencia: 'C2 · Vigente 2027',
    vehiculoAsignado: 'KLM-456 (NHR)',
    serviciosMes: 24,
    calificacion: '4.8 ★',
    estado: 'Disponible'
  },
  {
    id: 'COND-03',
    nombre: 'Andrés Villalobos',
    correo: 'andres.villalobos@logisty.com',
    documento: 'CC 1.018.490.335',
    telefono: '320 915 4402',
    licencia: 'C3 · Vigente 2029',
    vehiculoAsignado: 'JTR-912 (FVR)',
    serviciosMes: 31,
    calificacion: '5.0 ★',
    estado: 'Disponible'
  }
];

const normalizarTexto = (texto = '') =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

export default function Conductores({
  setPage,
  conductoresLista,
  setConductoresLista,
  mostrarToast
}) {
  const extrasDeArchivo = CONDUCTORES.filter(
    (c) =>
      !CONDUCTORES_BASE.some(
        (base) => normalizarTexto(base.nombre) === normalizarTexto(c.nombre)
      )
  ).map((c, idx) => ({
    id: `COND-0${4 + idx}`,
    nombre: c.nombre,
    correo: c.correo,
    documento: c.documento || 'CC 1.030.552.190',
    telefono: c.telefono || '311 502 7734',
    licencia: 'C2 · Vigente 2028',
    vehiculoAsignado: 'WQP-304 (NKR)',
    serviciosMes: 19,
    calificacion: '4.9 ★',
    estado: 'Disponible'
  }));

  const listaInicial =
    conductoresLista && conductoresLista.length > 0
      ? conductoresLista
      : [...CONDUCTORES_BASE, ...extrasDeArchivo];

  const [equipoLocal, setEquipoLocal] = useState(listaInicial);
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [licencia, setLicencia] = useState('C2 · Vigente 2028');
  const [vehiculoAsignado, setVehiculoAsignado] = useState('WQP-304 (NKR)');

  const equipoActivo =
    conductoresLista && conductoresLista.length > 0
      ? conductoresLista
      : equipoLocal;

  const guardarCambiosEquipo = (nuevaLista) => {
    setEquipoLocal(nuevaLista);
    if (setConductoresLista) {
      setConductoresLista(nuevaLista);
    }
  };

  const alternarEstadoConductor = (id) => {
    const ordenEstados = ['Disponible', 'En ruta', 'Descanso'];
    const actualizada = equipoActivo.map((cond) => {
      if (cond.id !== id) return cond;
      const indiceActual = ordenEstados.indexOf(cond.estado);
      const siguienteEstado =
        ordenEstados[(indiceActual + 1) % ordenEstados.length];
      mostrarToast(`Estado de ${cond.nombre} actualizado a ${siguienteEstado}`);
      return { ...cond, estado: siguienteEstado };
    });

    guardarCambiosEquipo(actualizada);
  };

  const eliminarConductor = (id, nombreCond) => {
    const actualizada = equipoActivo.filter((cond) => cond.id !== id);
    guardarCambiosEquipo(actualizada);
    mostrarToast(`Conductor ${nombreCond} eliminado de la flota`);
  };

  const registrarConductor = (e) => {
    e.preventDefault();
    const correoLimpio = correo.trim().toLowerCase();
    if (!nombre.trim() || !documento.trim() || !correoLimpio || !password) return;

    const yaExiste = [...CONDUCTORES, ...equipoActivo].some(
      (c) => c.correo && c.correo.toLowerCase() === correoLimpio
    );

    if (yaExiste) {
      mostrarToast('Ese correo ya pertenece a otro conductor registrado');
      return;
    }

    const nuevoConductor = {
      id: `COND-${Date.now().toString().slice(-4)}`,
      nombre: nombre.trim(),
      documento: documento.trim(),
      telefono: telefono.trim() || '315 000 0000',
      correo: correoLimpio,
      password,
      rol: 'conductor',
      licencia,
      vehiculo: vehiculoAsignado,
      vehiculoAsignado,
      serviciosMes: 0,
      calificacion: 'Nuevo',
      estado: 'Disponible'
    };

    guardarCambiosEquipo([nuevoConductor, ...equipoActivo]);
    setNombre('');
    setDocumento('');
    setTelefono('');
    setCorreo('');
    setPassword('');
    mostrarToast(`Conductor ${nuevoConductor.nombre} registrado con acceso activo`);
  };

  const obtenerIniciales = (texto = 'CD') =>
    texto
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || '')
      .join('');

  const obtenerBadge = (estado) => {
    if (estado === 'Disponible') return 'badge-verde';
    if (estado === 'En ruta') return 'badge-terra';
    return 'badge-ocre';
  };

  const obtenerClaseBorde = (estado) => {
    if (estado === 'En ruta') return 'en-ruta';
    if (estado === 'Descanso') return 'descanso';
    return '';
  };

  const conductoresFiltrados =
    filtroEstado === 'Todos'
      ? equipoActivo
      : equipoActivo.filter((c) => c.estado === filtroEstado);

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
              Talento operativo · {equipoActivo.length} conductores activos
            </p>
            <h1 className="adm-titulo-vista">Gestión de conductores</h1>
          </div>
        </div>

        <span className="badge badge-verde">
          {equipoActivo.filter((c) => c.estado === 'Disponible').length} disponible(s) hoy
        </span>
      </div>

      <div className="acond-grid">
        <section>
          <div className="acond-filtros">
            {['Todos', 'Disponible', 'En ruta', 'Descanso'].map((estado) => (
              <button
                key={estado}
                type="button"
                onClick={() => setFiltroEstado(estado)}
                className={`acond-filtro-btn ${filtroEstado === estado ? 'activo' : ''}`}
              >
                {estado}
              </button>
            ))}
          </div>

          <div className="acond-lista">
            {conductoresFiltrados.map((cond) => (
              <article
                key={cond.id}
                className={`card acond-card ${obtenerClaseBorde(cond.estado)}`}
              >
                <div className="acond-card-top">
                  <div className="acond-perfil">
                    <div className="acond-avatar">
                      {obtenerIniciales(cond.nombre)}
                    </div>
                    <div>
                      <h2 className="acond-nombre">{cond.nombre}</h2>
                      <p className="acond-subdato">
                        {cond.id} · {cond.documento}
                        {cond.correo ? ` · ${cond.correo}` : ''}
                      </p>
                    </div>
                  </div>

                  <span className={`badge ${obtenerBadge(cond.estado)}`}>
                    {cond.estado}
                  </span>
                </div>

                <div className="acond-meta-grid">
                  <div>
                    <p className="acond-meta-label">Licencia</p>
                    <p className="acond-meta-valor">{cond.licencia}</p>
                  </div>
                  <div>
                    <p className="acond-meta-label">Unidad asignada</p>
                    <p className="acond-meta-valor">{cond.vehiculoAsignado}</p>
                  </div>
                  <div>
                    <p className="acond-meta-label">Viajes mes</p>
                    <p className="acond-meta-valor">{cond.serviciosMes} servicios</p>
                  </div>
                  <div>
                    <p className="acond-meta-label">Calificación</p>
                    <p className="acond-meta-valor">{cond.calificacion}</p>
                  </div>
                </div>

                <div className="acond-footer">
                  <span className="acond-contacto">
                    <span className="material-symbols-outlined">call</span>
                    +57 {cond.telefono}
                  </span>

                  <div className="acond-acciones-footer">
                    <button
                      type="button"
                      onClick={() => alternarEstadoConductor(cond.id)}
                      className="btn btn-secundario"
                    >
                      <span className="material-symbols-outlined">sync</span>
                      Cambiar disponibilidad
                    </button>

                    <button
                      type="button"
                      onClick={() => eliminarConductor(cond.id, cond.nombre)}
                      className="acond-btn-eliminar"
                    >
                      <span className="material-symbols-outlined">delete</span>
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="card acond-tarjeta-form">
          <h2 className="adm-subtitulo-card">Vincular nuevo conductor</h2>

          <form onSubmit={registrarConductor}>
            <div className="adm-campo">
              <label className="lbl">Nombre completo</label>
              <input
                className="inp"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Luis Fernando Rodríguez"
                required
              />
            </div>

            <div className="acond-fila-doble adm-campo">
              <div>
                <label className="lbl">Número de documento</label>
                <input
                  className="inp"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ej. CC 1.024.889.110"
                  required
                />
              </div>

              <div>
                <label className="lbl">Teléfono móvil</label>
                <input
                  className="inp"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej. 312 456 7890"
                  required
                />
              </div>
            </div>

            <div className="acond-fila-doble adm-campo">
              <div>
                <label className="lbl">Correo de acceso</label>
                <input
                  type="email"
                  className="inp"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="conductor@logisty.com"
                  required
                />
              </div>

              <div>
                <label className="lbl">Contraseña inicial</label>
                <input
                  type="password"
                  className="inp"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  minLength={4}
                  required
                />
              </div>
            </div>

            <div className="acond-fila-doble adm-campo">
              <div>
                <label className="lbl">Categoría licencia</label>
                <select
                  className="inp"
                  value={licencia}
                  onChange={(e) => setLicencia(e.target.value)}
                >
                  <option>C2 · Vigente 2028</option>
                  <option>C3 · Vigente 2029</option>
                  <option>C1 · Vigente 2027</option>
                </select>
              </div>

              <div>
                <label className="lbl">Vehículo habitual</label>
                <select
                  className="inp"
                  value={vehiculoAsignado}
                  onChange={(e) => setVehiculoAsignado(e.target.value)}
                >
                  <option>WQP-304 (NKR)</option>
                  <option>KLM-456 (NHR)</option>
                  <option>XYZ-789 (NPR)</option>
                  <option>JTR-912 (FVR)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primario adm-btn-full">
              <span className="material-symbols-outlined">person_add</span>
              Registrar conductor en flota
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}