
import { useState } from "react";
import "./cotizacion.css";

function Cotizacion() {
  const [formulario, setFormulario] = useState({
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

  function solicitarCotizacion(e) {
    e.preventDefault();

    alert("¡Solicitud de cotización registrada correctamente!");

    setFormulario({
      origen: "",
      destino: "",
      tipoCarga: "",
      peso: "",
      descripcion: ""
    });
  }

  return (
    <div className="cotizacion">
      <h2>Solicitar cotización</h2>
      <p>Completa los siguientes datos para solicitar tu cotización.</p>

      <form onSubmit={solicitarCotizacion}>
        <label>Ciudad de origen</label>
        <input
          type="text"
          name="origen"
          value={formulario.origen}
          onChange={manejarCambio}
          placeholder="Ingrese ciudad de origen"
          required
        />

        <label>Ciudad de destino</label>
        <input
          type="text"
          name="destino"
          value={formulario.destino}
          onChange={manejarCambio}
          placeholder="Ingrese ciudad de destino"
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
          <option value="Peligrosa">Carga peligrosa</option>
        </select>

        <label>Peso aproximado (kg)</label>
        <input
          type="number"
          name="peso"
          value={formulario.peso}
          onChange={manejarCambio}
          placeholder="Ingrese el peso"
          min="1"
          required
        />

        <label>Descripción de la carga</label>
        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={manejarCambio}
          placeholder="Describa la mercancía"
          required
        />

        <button type="submit">Solicitar cotización</button>
      </form>
    </div>
  );
}

export default Cotizacion;
