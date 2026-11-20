
import "./panelcliente.css";

function PanelCliente() {
  return (
    <div className="panel-cliente">
      <h2>Panel de cliente</h2>
      <p>Bienvenido a Logisty Cargo System.</p>

      <div className="panel-resumen">
        <div className="panel-tarjeta">
          <h3>Mis servicios</h3>
          <p>3</p>
          <span>Servicios registrados</span>
        </div>

        <div className="panel-tarjeta">
          <h3>Pagos realizados</h3>
          <p>2</p>
          <span>Pagos completados</span>
        </div>

        <div className="panel-tarjeta">
          <h3>Pagos pendientes</h3>
          <p>1</p>
          <span>Pagos por realizar</span>
        </div>
      </div>

      <div className="panel-informacion">
        <h3>Información del sistema</h3>
        <p>
          Desde este panel puedes consultar tus servicios,
          revisar tus pagos y solicitar nuevos transportes.
        </p>
      </div>
    </div>
  );
}

export default PanelCliente;
