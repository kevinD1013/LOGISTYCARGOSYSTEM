
import { useState } from "react";
import "./solicitarservicio.css";

function SolicitarServicio() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    origen: "",
    destino: "",
    tipoCarga: "",
    peso: "",
    descripcion: ""
  });

  function manejarCambio(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  }

  function enviarSolicitud(e) {
    e.preventDefault();

    alert("¡Tu solicitud de servicio fue registrada correctamente!");

    setFormulario({
      nombre: "",
      telefono: "",
      origen: "",
      destino: "",
      tipoCarga: "",
      peso: "",
      descripcion: ""
    });
  }

  return (
    <div className="solicitar-servicio">
      <h2>Solicitar servicio</h2>
      <p>Completa el formulario para solicitar un servicio de transporte.</p>

      <form onSubmit={enviarSolicitud}>
        <label>Nombre del cliente</label>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <label>Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={formulario.telefono}
          onChange={manejarCambio}
          required
        />

        <label>Ciudad de origen</label>
        <input
          type="text"
          name="origen"
          value={formulario.origen}
          onChange={manejarCambio}
          required
        />

        <label>Ciudad de destino</label>
        <input
          type="text"
          name="destino"
          value={formulario.destino}
          onChange={manejarCambio}
          required
        />

        <label>Tipo de carga</label>
        <select
          name="tipoCarga"
          value={formulario.tipoCarga}
          onChange={manejarCambio}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="General">Carga general</option>
          <option value="Fragil">Carga frágil</option>
          <option value="Refrigerada">Carga refrigerada</option>
          <option value="Otra">Otra</option>
        </select>

        <label>Peso aproximado (kg)</label>
        <input
          type="number"
          name="peso"
          min="1"
          value={formulario.peso}
          onChange={manejarCambio}
          required
        />

        <label>Descripción del servicio</label>
        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={manejarCambio}
          required
        />

        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
}

export default SolicitarServicio;
