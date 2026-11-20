
import { useState } from "react";
import "./misservicios.css";

function MisServicios() {
  const [servicios] = useState([
    {
      id: 1,
      origen: "Bogotá",
      destino: "Medellín",
      fecha: "20/11/2026",
      estado: "En proceso"
    },
    {
      id: 2,
      origen: "Cali",
      destino: "Bogotá",
      fecha: "22/11/2026",
      estado: "Entregado"
    },
    {
      id: 3,
      origen: "Bogotá",
      destino: "Barranquilla",
      fecha: "25/11/2026",
      estado: "Pendiente"
    }
  ]);

  return (
    <div className="mis-servicios">
      <h2>Mis servicios</h2>
      <p>Consulta el estado de tus servicios de transporte.</p>

      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.id}>
              <td>{servicio.id}</td>
              <td>{servicio.origen}</td>
              <td>{servicio.destino}</td>
              <td>{servicio.fecha}</td>
              <td>{servicio.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MisServicios;
