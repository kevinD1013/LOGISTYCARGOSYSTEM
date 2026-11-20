
import { useState } from "react";
import "./pagos.css";

function Pagos() {
  const [pagos] = useState([
    {
      id: 1,
      servicio: "Servicio #001",
      fecha: "15/11/2026",
      valor: "$250.000",
      estado: "Pagado"
    },
    {
      id: 2,
      servicio: "Servicio #002",
      fecha: "18/11/2026",
      valor: "$180.000",
      estado: "Pendiente"
    },
    {
      id: 3,
      servicio: "Servicio #003",
      fecha: "20/11/2026",
      valor: "$320.000",
      estado: "Pagado"
    }
  ]);

  return (
    <div className="pagos">
      <h2>Mis pagos</h2>
      <p>Consulta el historial de tus pagos y servicios.</p>

      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Servicio</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.id}</td>
              <td>{pago.servicio}</td>
              <td>{pago.fecha}</td>
              <td>{pago.valor}</td>
              <td>{pago.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pagos;
