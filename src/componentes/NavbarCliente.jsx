import { useState } from 'react';

export default function NavbarCliente({ page, setPage, userName, cerrarSesion }) {
  const [notifOpen, setNotifOpen] = useState(false);

  const iniciales = (userName || 'AG')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="topbar-h shell-bloque-30">
      <div className="shell-bloque-31">
        <div className="shell-bloque-32">
          <img alt="Logo" className="shell-imagen-16" src="/imagenes/LOGO.jpg" />
        </div>
        <div>
          <p className="shell-texto-17">Logisty Cargo</p>
          <p className="shell-texto-18">Logistics that move you</p>
        </div>
      </div>

      <nav className="shell-nav-33">
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); setPage('dash_cliente'); }}
          className={`tnav-link shell-enlace-20 ${page === 'dash_cliente' ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined ms">home</span>Inicio
          {page === 'dash_cliente' && <span className="tnav-underline"></span>}
        </a>

        <a
          href="#solicitar"
          onClick={(e) => { e.preventDefault(); setPage('cl_solicitud'); }}
          className={`tnav-link shell-enlace-20 ${['cl_solicitud', 'cl_cotizacion'].includes(page) ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined ms">add_box</span>Solicitar mudanza
          {['cl_solicitud', 'cl_cotizacion'].includes(page) && <span className="tnav-underline"></span>}
        </a>

        <a
          href="#seguimiento"
          onClick={(e) => { e.preventDefault(); setPage('cl_seguimiento'); }}
          className={`tnav-link shell-enlace-20 ${page === 'cl_seguimiento' ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined ms">local_shipping</span>Seguimiento
          {page === 'cl_seguimiento' && <span className="tnav-underline"></span>}
        </a>

        <a
          href="#historial"
          onClick={(e) => { e.preventDefault(); setPage('cl_historial'); }}
          className={`tnav-link shell-enlace-20 ${page === 'cl_historial' ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined ms">history</span>Historial
          {page === 'cl_historial' && <span className="tnav-underline"></span>}
        </a>

        <a
          href="#pagos"
          onClick={(e) => { e.preventDefault(); setPage('cl_pagos'); }}
          className={`tnav-link shell-enlace-20 ${page === 'cl_pagos' ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined ms">receipt_long</span>Pagos
          {page === 'cl_pagos' && <span className="tnav-underline"></span>}
        </a>

        <a
          href="#soporte"
          onClick={(e) => { e.preventDefault(); setPage('cl_soporte'); }}
          className={`tnav-link shell-enlace-20 ${page === 'cl_soporte' ? 'active' : ''}`}
        >
          <span className="material-symbols-outlined ms">headset_mic</span>Soporte
          {page === 'cl_soporte' && <span className="tnav-underline"></span>}
        </a>
      </nav>

      <div className="shell-bloque-21">
        <div className="shell-bloque-22-envoltorio">
          <div onClick={() => setNotifOpen(!notifOpen)} className="shell-bloque-22">
            <span className="material-symbols-outlined shell-texto-23">notifications</span>
            <span className="shell-texto-34"></span>
          </div>

          {notifOpen && (
            <div className="shell-notif-panel">
              <p className="shell-notif-panel-titulo">Notificaciones</p>
              <div className="shell-notif-vacio">
                <span className="material-symbols-outlined">notifications_off</span>
                <p>No tienes notificaciones nuevas</p>
              </div>
            </div>
          )}
        </div>

        <div onClick={cerrarSesion} className="shell-bloque-25">
          <div className="shell-bloque-26">{iniciales}</div>
          <div>
            <p className="shell-texto-27">{userName || 'Ana García'}</p>
            <p className="shell-texto-28">Cliente</p>
          </div>
          <span className="material-symbols-outlined shell-texto-29">expand_more</span>
        </div>
      </div>
    </div>
  );
}