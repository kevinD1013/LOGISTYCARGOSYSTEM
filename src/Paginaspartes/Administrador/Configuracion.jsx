import { useState } from 'react';
import './admin_comun.css';
import './configuracion.css';

const CONFIG_POR_DEFECTO = {
  tarifaNHR: 160000,
  tarifaNPR: 260000,
  tarifaFVR: 410000,
  valorAuxiliar: 35000,
  recargoEscaleras: 40000,
  recargoSabana: 65000,
  horaInicio: '06:00',
  horaCierre: '21:00',
  horasReprogramacion: 24,
  alertaMantenimientoKm: 5000,
  notificarClientesGps: true,
  alertarFallasTaller: true,
  bloqueoPorDocumentos: true
};

const formatearCOP = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
};

export default function Configuracion({
  setPage,
  usuarioActual,
  mostrarToast
}) {
  const [config, setConfig] = useState(CONFIG_POR_DEFECTO);

  const actualizarCampo = (campo, valor) => {
    setConfig({
      ...config,
      [campo]: valor
    });
  };

  const guardarCambios = (e) => {
    e.preventDefault();
    mostrarToast('Parámetros operativos y tarifario actualizados correctamente');
  };

  const restaurarDefecto = () => {
    setConfig(CONFIG_POR_DEFECTO);
    mostrarToast('Valores originales restaurados');
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
              Administración · {usuarioActual?.nombre || 'Administrador General'}
            </p>
            <h1 className="adm-titulo-vista">Configuración del sistema y tarifas</h1>
          </div>
        </div>

        <span className="badge badge-verde">Entorno operativo activo</span>
      </div>

      <form onSubmit={guardarCambios} className="aconf-grid">
        <div className="aconf-columna-izq">
          <section className="card aconf-tarjeta-tarifas">
            <h2 className="adm-subtitulo-card">1. Tarifario base por vehículo (COP)</h2>

            <div className="aconf-fila-triple adm-campo">
              <div>
                <label className="lbl">Furgón NHR (2.5 Ton)</label>
                <input
                  type="number"
                  className="inp"
                  value={config.tarifaNHR}
                  onChange={(e) => actualizarCampo('tarifaNHR', Number(e.target.value))}
                  min={50000}
                  step={5000}
                  required
                />
              </div>

              <div>
                <label className="lbl">Camión NPR (3.5 Ton)</label>
                <input
                  type="number"
                  className="inp"
                  value={config.tarifaNPR}
                  onChange={(e) => actualizarCampo('tarifaNPR', Number(e.target.value))}
                  min={50000}
                  step={5000}
                  required
                />
              </div>

              <div>
                <label className="lbl">Camión FVR (6.0 Ton)</label>
                <input
                  type="number"
                  className="inp"
                  value={config.tarifaFVR}
                  onChange={(e) => actualizarCampo('tarifaFVR', Number(e.target.value))}
                  min={50000}
                  step={5000}
                  required
                />
              </div>
            </div>

            <div className="aconf-fila-triple">
              <div>
                <label className="lbl">Valor por auxiliar</label>
                <input
                  type="number"
                  className="inp"
                  value={config.valorAuxiliar}
                  onChange={(e) =>
                    actualizarCampo('valorAuxiliar', Number(e.target.value))
                  }
                  min={10000}
                  step={5000}
                  required
                />
              </div>

              <div>
                <label className="lbl">Recargo escaleras</label>
                <input
                  type="number"
                  className="inp"
                  value={config.recargoEscaleras}
                  onChange={(e) =>
                    actualizarCampo('recargoEscaleras', Number(e.target.value))
                  }
                  min={0}
                  step={5000}
                  required
                />
              </div>

              <div>
                <label className="lbl">Recargo Sabana</label>
                <input
                  type="number"
                  className="inp"
                  value={config.recargoSabana}
                  onChange={(e) =>
                    actualizarCampo('recargoSabana', Number(e.target.value))
                  }
                  min={0}
                  step={5000}
                  required
                />
              </div>
            </div>
          </section>

          <section className="card aconf-tarjeta-operacion">
            <h2 className="adm-subtitulo-card">2. Reglas de despacho y automatización</h2>

            <div className="aconf-fila-doble adm-campo">
              <div>
                <label className="lbl">Apertura de operaciones</label>
                <input
                  type="time"
                  className="inp"
                  value={config.horaInicio}
                  onChange={(e) => actualizarCampo('horaInicio', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="lbl">Cierre de despachos</label>
                <input
                  type="time"
                  className="inp"
                  value={config.horaCierre}
                  onChange={(e) => actualizarCampo('horaCierre', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="aconf-fila-doble adm-campo">
              <div>
                <label className="lbl">Antelación reprogramación (horas)</label>
                <input
                  type="number"
                  className="inp"
                  value={config.horasReprogramacion}
                  onChange={(e) =>
                    actualizarCampo('horasReprogramacion', Number(e.target.value))
                  }
                  min={1}
                  max={72}
                  required
                />
              </div>

              <div>
                <label className="lbl">Preventivo taller cada (km)</label>
                <input
                  type="number"
                  className="inp"
                  value={config.alertaMantenimientoKm}
                  onChange={(e) =>
                    actualizarCampo('alertaMantenimientoKm', Number(e.target.value))
                  }
                  min={1000}
                  step={500}
                  required
                />
              </div>
            </div>

            <div className="aconf-switch-lista">
              <label className="aconf-switch-item">
                <div>
                  <p className="aconf-switch-titulo">
                    Notificar cambio de etapa GPS al cliente
                  </p>
                  <p className="aconf-switch-desc">
                    Sincroniza automáticamente el mapa y el panel del cliente en cada hito
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="aconf-checkbox"
                  checked={config.notificarClientesGps}
                  onChange={(e) =>
                    actualizarCampo('notificarClientesGps', e.target.checked)
                  }
                />
              </label>

              <label className="aconf-switch-item">
                <div>
                  <p className="aconf-switch-titulo">
                    Priorizar alertas mecánicas en consola
                  </p>
                  <p className="aconf-switch-desc">
                    Destaca fallas reportadas por conductores directamente en la ficha del camión
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="aconf-checkbox"
                  checked={config.alertarFallasTaller}
                  onChange={(e) =>
                    actualizarCampo('alertarFallasTaller', e.target.checked)
                  }
                />
              </label>

              <label className="aconf-switch-item">
                <div>
                  <p className="aconf-switch-titulo">
                    Validar SOAT y tecnomecánica antes de asignar
                  </p>
                  <p className="aconf-switch-desc">
                    Impide despachar unidades marcadas en taller o con documentos vencidos
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="aconf-checkbox"
                  checked={config.bloqueoPorDocumentos}
                  onChange={(e) =>
                    actualizarCampo('bloqueoPorDocumentos', e.target.checked)
                  }
                />
              </label>
            </div>

            <div className="aconf-acciones">
              <button type="submit" className="btn btn-primario">
                <span className="material-symbols-outlined">save</span>
                Guardar configuración
              </button>

              <button
                type="button"
                onClick={restaurarDefecto}
                className="btn btn-secundario"
              >
                <span className="material-symbols-outlined">restart_alt</span>
                Restaurar valores por defecto
              </button>
            </div>
          </section>
        </div>

        <aside className="aconf-columna-der">
          <section className="card aconf-tarjeta-sistema">
            <h2 className="adm-subtitulo-card">Vista previa del tarifario vigente</h2>

            <div className="aconf-info-lista">
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Base Furgón NHR</span>
                <span className="aconf-info-valor aconf-mono">
                  {formatearCOP(config.tarifaNHR)}
                </span>
              </div>
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Base Camión NPR</span>
                <span className="aconf-info-valor aconf-mono">
                  {formatearCOP(config.tarifaNPR)}
                </span>
              </div>
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Base Camión FVR</span>
                <span className="aconf-info-valor aconf-mono">
                  {formatearCOP(config.tarifaFVR)}
                </span>
              </div>
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Auxiliar de cargue</span>
                <span className="aconf-info-valor aconf-mono">
                  +{formatearCOP(config.valorAuxiliar)}
                </span>
              </div>
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Recargo escaleras / Sabana</span>
                <span className="aconf-info-valor aconf-mono">
                  +{formatearCOP(config.recargoEscaleras)} / +{formatearCOP(config.recargoSabana)}
                </span>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="adm-subtitulo-card">Información institucional y técnica</h2>

            <div className="aconf-info-lista">
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Empresa operadora</span>
                <span className="aconf-info-valor">Logisty Cargo S.A.S.</span>
              </div>
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Sede principal</span>
                <span className="aconf-info-valor">Bogotá D.C., Colombia</span>
              </div>
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Horario de despacho</span>
                <span className="aconf-info-valor">
                  {config.horaInicio} – {config.horaCierre}
                </span>
              </div>
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Motor cartográfico</span>
                <span className="aconf-info-valor">Leaflet + OpenStreetMap</span>
              </div>
              <div className="aconf-info-fila">
                <span className="aconf-info-label">Versión de plataforma</span>
                <span className="badge badge-ocre">v1.0.0 · Producción</span>
              </div>
            </div>
          </section>
        </aside>
      </form>
    </main>
  );
}