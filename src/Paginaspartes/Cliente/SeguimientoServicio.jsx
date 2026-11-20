
import { useState } from "react";
import "./seguimientoservicio.css";

function SeguimientoServicio() {
  const [numeroServicio, setNumeroServicio] = useState("");
  const [servicio, setServicio] = useState(null);

  const servicios = [
    {
      numero: "LC001",
      origen: "Bogotá",
      destino: "Medellín",
      estado: "En tránsito",
      fecha: "20/11/2026"
    },
    {
      numero: "LC002",
      origen: "Cali",
      destino: "Bogotá",
      estado: "Entregado",
      fecha: "19/11/2026"
    }
  ];

  function buscarServicio(e) {
    e.preventDefault();

    const resultado = servicios.find(
      (item) => item.numero.toLowerCase() === numeroServicio.toLowerCase()
    );

    setServicio(resultado || "no encontrado");
  }

  return (
    <div className="seguimiento-servicio">
      <h2>Seguimiento de servicio</h2>
      <p>Consulta el estado actual de tu mercancía.</p>

      <form onSubmit={buscarServicio}>
        <label>Número de servicio</label>

        <input
          type="text"
          placeholder="Ejemplo: LC001"
          value={numeroServicio}
          onChange={(e) => setNumeroServicio(e.target.value)}
          required
        />

        <button type="submit">Consultar</button>
      </form>

      {servicio && servicio !== "no encontrado" && (
        <div className="resultado-seguimiento">
          <h3>Información del servicio</h3>
          <p><strong>Número:</strong> {servicio.numero}</p>
          <p><strong>Origen:</strong> {servicio.origen}</p>
          <p><strong>Destino:</strong> {servicio.destino}</p>
          <p><strong>Fecha:</strong> {servicio.fecha}</p>
          <p><strong>Estado:</strong> {servicio.estado}</p>
        </div>
      )}

      {servicio === "no encontrado" && (
        <p className="mensaje-error">No se encontró el servicio.</p>
      )}
    </div>
  );
}

export default SeguimientoServicio;
