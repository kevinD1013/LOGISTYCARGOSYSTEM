import { useState } from 'react';
import './Registrocliente.css';

export default function Registrocliente({ setPage, registrarCliente, mostrarToast }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const manejarRegistro = (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      mostrarToast('Las contraseñas no coinciden');
      return;
    }

    const exito = registrarCliente({
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      correo: correo.trim().toLowerCase(),
      password,
      rol: 'cliente' // Siempre se guarda como cliente
    });

    if (exito) {
      setPage('login');
    }
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
            <input
              className="inp"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Ana García"
              required
            />
          </div>
          <div>
            <label className="lbl">Teléfono</label>
            <input
              className="inp"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+57 300 000 0000"
              required
            />
          </div>
        </div>

        <div className="registro-campo">
          <label className="lbl">Correo electrónico</label>
          <input
            className="inp"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="cliente@email.com"
            required
          />
        </div>

        <div className="registro-fila-doble">
          <div>
            <label className="lbl">Contraseña</label>
            <input
              className="inp"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="lbl">Confirmar contraseña</label>
            <input
              className="inp"
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              placeholder="••••••••"
              required
            />
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