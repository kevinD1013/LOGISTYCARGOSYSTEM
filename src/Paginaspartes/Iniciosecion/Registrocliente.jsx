import './Registrocliente.css';

export default function Registrocliente({ setPage, doLogin }) {
  const manejarRegistro = (e) => {
    e.preventDefault();
    // Inicia sesión directamente con el rol 'cliente'
    doLogin('cliente');
  };

  return (
    <div className="registro-contenedor">
      <form onSubmit={manejarRegistro} className="card registro-card">
        <div className="registro-marca">
          <div className="registro-icono-marca">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <span className="registro-marca-nombre">Logisty Cargo</span>
        </div>

        <h2 className="registro-titulo">Registro de nuevo cliente</h2>

        <div className="registro-fila-doble">
          <div>
            <label className="lbl">Nombre completo</label>
            <input className="inp" placeholder="Tu nombre completo" required />
          </div>
          <div>
            <label className="lbl">Teléfono</label>
            <input className="inp" type="tel" placeholder="+57 300 000 0000" required />
          </div>
        </div>

        <div className="registro-campo">
          <label className="lbl">Correo electrónico</label>
          <input className="inp" type="email" placeholder="cliente@email.com" required />
        </div>

        <div className="registro-fila-doble">
          <div>
            <label className="lbl">Contraseña</label>
            <input className="inp" type="password" placeholder="••••••••" required />
          </div>
          <div>
            <label className="lbl">Confirmar contraseña</label>
            <input className="inp" type="password" placeholder="••••••••" required />
          </div>
        </div>

        <div className="registro-acciones">
          <button
            type="button"
            onClick={() => setPage('login')}
            className="btn btn-secundario"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primario">
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
}