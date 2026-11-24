import { useState } from 'react';
import './admin_comun.css';
import './clientes.css';

export default function Clientes({
  setPage,
  clientes = [],
  ticketsSoporte = [],
  setTicketsSoporte,
  serviciosCliente = [],
  mostrarToast
}) {
  const [busqueda, setBusqueda] = useState('');

  const clientePrincipal = {
    nombre: 'Ana García',
    correo: 'ana.garcia@logisty.com',
    telefono: '315 742 8910',
    ciudad: 'Bogotá D.C.',
    serviciosTotales: 3 + serviciosCliente.length
  };

  const clientesRegistrados = clientes
    .filter((c) => c.correo.toLowerCase() !== clientePrincipal.correo)
    .map((c) => ({
      nombre: c.nombre,
      correo: c.correo,
      telefono: c.telefono || '310 000 0000',
      ciudad: c.ciudad || 'Bogotá D.C.',
      serviciosTotales: 0
    }));

  const directorioCompleto = [clientePrincipal, ...clientesRegistrados];

  const directorioFiltrado = directorioCompleto.filter((cli) => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return true;
    return (
      cli.nombre.toLowerCase().includes(texto) ||
      cli.correo.toLowerCase().includes(texto) ||
      cli.telefono.toLowerCase().includes(texto)
    );
  });

  const resolverTicket = (codigoTicket) => {
    if (!setTicketsSoporte) return;

    const actualizados = ticketsSoporte.map((tkt) =>
      tkt.codigo === codigoTicket ? { ...tkt, estado: 'Resuelto' } : tkt
    );

    setTicketsSoporte(actualizados);
    mostrarToast(`Ticket ${codigoTicket} marcado como Resuelto`);
  };

  const obtenerIniciales = (nombre = 'CL') => {
    return nombre
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || '')
      .join('');
  };

  const ticketsAbiertos = ticketsSoporte.filter(
    (t) => t.estado === 'Abierto'
  ).length;

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
              Base de usuarios · {directorioCompleto.length} cliente(s) activo(s)
            </p>
            <h1 className="adm-titulo-vista">Directorio de clientes y soporte PQRS</h1>
          </div>
        </div>

        <span className={`badge ${ticketsAbiertos > 0 ? 'badge-terra' : 'badge-verde'}`}>
          {ticketsAbiertos > 0
            ? `${ticketsAbiertos} ticket(s) por atender`
            : 'Sin tickets pendientes'}
        </span>
      </div>

      <div className="acli-grid">
        <section className="card acli-tarjeta-dir">
          <h2 className="adm-subtitulo-card">Clientes registrados en plataforma</h2>

          <div className="acli-buscador">
            <input
              className="inp"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar cliente por nombre, correo o teléfono..."
            />
          </div>

          {directorioFiltrado.length === 0 ? (
            <div className="acli-vacio">
              No se encontraron clientes con ese criterio de búsqueda.
            </div>
          ) : (
            <div className="acli-lista-clientes">
              {directorioFiltrado.map((cli) => (
                <article key={cli.correo} className="acli-cliente-card">
                  <div className="acli-cliente-top">
                    <div className="acli-cliente-perfil">
                      <div className="acli-avatar">
                        {obtenerIniciales(cli.nombre)}
                      </div>
                      <div>
                        <p className="acli-nombre">{cli.nombre}</p>
                        <p className="acli-correo">{cli.correo}</p>
                      </div>
                    </div>

                    <span className="badge badge-verde">Activo</span>
                  </div>

                  <div className="acli-meta">
                    <span>Tel: +57 {cli.telefono}</span>
                    <span>{cli.ciudad}</span>
                    <strong>{cli.serviciosTotales} servicio(s)</strong>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="card acli-tarjeta-tickets">
          <h2 className="adm-subtitulo-card">
            Solicitudes PQRS y soporte ({ticketsSoporte.length})
          </h2>

          {ticketsSoporte.length === 0 ? (
            <div className="acli-vacio">
              No hay solicitudes de soporte registradas todavía.
            </div>
          ) : (
            <div className="acli-lista-tickets">
              {ticketsSoporte.map((tkt) => {
                const esResuelto = tkt.estado === 'Resuelto';

                return (
                  <article
                    key={tkt.codigo}
                    className={`acli-ticket-card ${esResuelto ? 'resuelto' : ''}`}
                  >
                    <div className="acli-ticket-top">
                      <span className="acli-ticket-codigo">
                        {tkt.codigo} · Orden {tkt.orden}
                      </span>
                      <span
                        className={`badge ${esResuelto ? 'badge-verde' : 'badge-ocre'}`}
                      >
                        {tkt.estado}
                      </span>
                    </div>

                    <p className="acli-ticket-asunto">{tkt.asunto}</p>
                    <p className="acli-ticket-desc">{tkt.mensaje}</p>

                    <div className="acli-ticket-meta">
                      <span>
                        Cliente: <strong>{tkt.cliente}</strong> · {tkt.fecha}
                      </span>

                      {!esResuelto && (
                        <button
                          type="button"
                          onClick={() => resolverTicket(tkt.codigo)}
                          className="btn btn-primario"
                        >
                          <span className="material-symbols-outlined">check</span>
                          Marcar como Resuelto
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}