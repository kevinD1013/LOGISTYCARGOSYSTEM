
import { useState } from "react";
import "./soporte.css";

function Soporte() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: ""
  });

  const [consultas, setConsultas] = useState([]);

  function manejarCambio(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  }

  function enviarConsulta(e) {
    e.preventDefault();

    const nuevaConsulta = {
      id: Date.now(),
      ...formulario
    };

    setConsultas([...consultas, nuevaConsulta]);

    alert("Tu solicitud de soporte fue enviada correctamente.");

    setFormulario({
      nombre: "",
      correo: "",
      asunto: "",
      mensaje: ""
    });
  }

  return (
    <div className="soporte">
      <h2>Centro de soporte</h2>
      <p>¿Necesitas ayuda? Envíanos tu consulta.</p>

      <form onSubmit={enviarConsulta}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <label>Correo electrónico</label>
        <input
          type="email"
          name="correo"
          value={formulario.correo}
          onChange={manejarCambio}
          required
        />

        <label>Asunto</label>
        <select
          name="asunto"
          value={formulario.asunto}
          onChange={manejarCambio}
          required
        >
          <option value="">Seleccione un asunto</option>
          <option value="Problemas con un servicio">Problemas con un servicio</option>
          <option value="Pagos">Pagos</option>
          <option value="Cotizaciones">Cotizaciones</option>
          <option value="Otros">Otros</option>
        </select>

        <label>Mensaje</label>
        <textarea
          name="mensaje"
          value={formulario.mensaje}
          onChange={manejarCambio}
          placeholder="Escribe tu consulta..."
          required
        />

        <button type="submit">Enviar consulta</button>
      </form>

      <h3>Mis consultas enviadas</h3>

      {consultas.length === 0 ? (
        <p>Aún no tienes consultas registradas.</p>
      ) : (
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta.id}>
              <strong>{consulta.asunto}</strong>
              <p>{consulta.mensaje}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Soporte;
