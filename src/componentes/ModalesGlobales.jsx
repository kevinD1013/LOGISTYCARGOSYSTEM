export default function ModalesGlobales({
  contactModal,
  setContactModal,
  cancelModal,
  setCancelModal,
  setPage,
  mostrarToast
}) {
  return (
    <>
      {/* Modal Contactar Conductor */}
      {contactModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setContactModal(false); }}
          className="modal-bg"
        >
          <div className="card shell-bloque-45">
            <div className="shell-bloque-46">
              <div className="shell-bloque-47">CM</div>
              <div>
                <p className="shell-texto-48">Carlos Mendoza</p>
                <p className="shell-texto-49">Conductor asignado</p>
              </div>
            </div>
            <div className="shell-bloque-50">
              <button
                onClick={() => { setContactModal(false); mostrarToast('Llamando a Carlos Mendoza...'); }}
                className="btn btn-p shell-boton-51"
              >
                <span className="material-symbols-outlined shell-texto-52">call</span>
                Llamar · +57 310 XXX XXXX
              </button>
              <button
                onClick={() => { setContactModal(false); mostrarToast('Abriendo chat con el conductor'); }}
                className="btn btn-s shell-boton-51"
              >
                <span className="material-symbols-outlined shell-texto-52">chat</span>
                Enviar mensaje
              </button>
            </div>
            <a
              href="#cerrar"
              onClick={(e) => { e.preventDefault(); setContactModal(false); }}
              className="shell-enlace-53"
            >
              Cerrar
            </a>
          </div>
        </div>
      )}

      {/* Modal Cancelar Servicio */}
      {cancelModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setCancelModal(false); }}
          className="modal-bg"
        >
          <div className="card shell-bloque-54">
            <div className="shell-bloque-55">
              <span className="material-symbols-outlined shell-texto-56">warning</span>
            </div>
            <h3 className="shell-subtitulo-57">¿Cancelar este servicio?</h3>
            <p className="shell-texto-58">
              El camión ya salió. Cancelar ahora puede generar un cargo del 20% del valor del servicio.
            </p>
            <div className="shell-bloque-59">
              <button onClick={() => setCancelModal(false)} className="btn btn-s shell-boton-60">
                Volver
              </button>
              <button
                onClick={() => {
                  setCancelModal(false);
                  setPage('dash_cliente');
                  mostrarToast('Servicio cancelado');
                }}
                className="btn btn-d shell-boton-61"
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}