/* ==========================================================
   ENRUTADOR
   Este archivo es el "cartero" del prototipo: cada vez que
   cambia $store.app.page (por ejemplo, al hacer clic en un
   botón del menú), este archivo va a buscar el archivo HTML
   correcto dentro de la carpeta paginas/, lo descarga con
   fetch() y lo coloca dentro del "hueco" que le corresponde
   en index.html.

   ¿Por qué es necesario?
   Antes, todas las pantallas estaban siempre presentes en el
   HTML y solo se mostraban u ocultaban con x-show. Ahora cada
   pantalla vive en su propio archivo, así que hay que TRAERLA
   cuando se necesita.

   Después de insertar el HTML nuevo, se llama a
   Alpine.initTree(...) para que Alpine.js "active" los
   x-show, @click, x-text, etc. que acaban de llegar. Sin este
   paso, Alpine no se daría cuenta de que hay contenido nuevo
   para procesar.
   ========================================================== */

// ── MAPA DE RUTAS ──
// Qué archivo corresponde a cada valor de $store.app.page.
const RUTAS_DE_PAGINAS = {
  // Autenticación
  login: 'paginas/inicio_sesion.html',
  recover: 'paginas/recuperar_contrasena.html',
  register: 'paginas/registro_cliente.html',

  // Administrador
  dash_admin: 'paginas/administrador/panel_administrador.html',
  ad_servicios: 'paginas/administrador/servicios.html',
  ad_asignaciones: 'paginas/administrador/asignaciones.html',
  ad_vehiculos: 'paginas/administrador/vehiculos.html',
  ad_conductores: 'paginas/administrador/conductores.html',
  ad_clientes: 'paginas/administrador/clientes.html',
  ad_reportes: 'paginas/administrador/reportes.html',
  ad_config: 'paginas/administrador/configuracion.html',

  // Cliente
  dash_cliente: 'paginas/cliente/panel_cliente.html',
  cl_solicitud: 'paginas/cliente/solicitar_servicio.html',
  cl_cotizacion: 'paginas/cliente/cotizacion.html',
  cl_seguimiento: 'paginas/cliente/seguimiento_servicio.html',
  cl_historial: 'paginas/cliente/mis_servicios.html',
  cl_pagos: 'paginas/cliente/pagos.html',
  cl_soporte: 'paginas/cliente/soporte.html',

  // Conductor
  dash_conductor: 'paginas/conductor/panel_conductor.html',
  co_parada: 'paginas/conductor/parada_actual.html',
  co_checklist: 'paginas/conductor/checklist_carga.html',
  co_incidente: 'paginas/conductor/reportar_novedad.html',
  co_vehiculo: 'paginas/conductor/mi_vehiculo.html',
  co_historial: 'paginas/conductor/historial_servicios.html',

  // 'welcome' no tiene ruta: es la pantalla de carga y vive
  // directamente en index.html (no se recarga desde un archivo).
};

// ── A QUÉ "HUECO" (contenedor) PERTENECE CADA PANTALLA ──
const CONTENEDOR_DE_PAGINA = {
  login: 'contenido-autenticacion',
  recover: 'contenido-autenticacion',
  register: 'contenido-autenticacion',

  dash_admin: 'contenido-administrador',
  ad_servicios: 'contenido-administrador',
  ad_asignaciones: 'contenido-administrador',
  ad_vehiculos: 'contenido-administrador',
  ad_conductores: 'contenido-administrador',
  ad_clientes: 'contenido-administrador',
  ad_reportes: 'contenido-administrador',
  ad_config: 'contenido-administrador',

  dash_cliente: 'contenido-cliente',
  cl_solicitud: 'contenido-cliente',
  cl_cotizacion: 'contenido-cliente',
  cl_seguimiento: 'contenido-cliente',
  cl_historial: 'contenido-cliente',
  cl_pagos: 'contenido-cliente',
  cl_soporte: 'contenido-cliente',

  dash_conductor: 'contenido-conductor',
  co_parada: 'contenido-conductor',
  co_checklist: 'contenido-conductor',
  co_incidente: 'contenido-conductor',
  co_vehiculo: 'contenido-conductor',
  co_historial: 'contenido-conductor',
};

// Guarda en memoria los archivos ya descargados, para no
// pedirlos de nuevo al servidor cada vez que la persona vuelve
// a esa misma pantalla.
const cacheDePaginas = {};

async function cargarPagina(nombrePagina) {
  const ruta = RUTAS_DE_PAGINAS[nombrePagina];
  if (!ruta) return; // 'welcome' u otro valor sin archivo asociado

  const idContenedor = CONTENEDOR_DE_PAGINA[nombrePagina];
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  try {
    let html = cacheDePaginas[ruta];
    if (!html) {
      const respuesta = await fetch(ruta);
      html = await respuesta.text();
      cacheDePaginas[ruta] = html;
    }
    contenedor.innerHTML = html;
    // Le avisamos a Alpine.js que hay contenido nuevo para
    // activar (x-show, @click, x-text, x-data del checklist, etc.)
    window.Alpine.initTree(contenedor);
  } catch (error) {
    console.error('No se pudo cargar la página "' + nombrePagina + '" desde ' + ruta, error);
  }
}

document.addEventListener('alpine:init', () => {
  // Alpine.effect vuelve a ejecutar esta función automáticamente
  // cada vez que cambia $store.app.page, sin importar desde
  // dónde se haya cambiado (menú, botón, doLogin, etc.).
  Alpine.effect(() => {
    const paginaActual = Alpine.store('app').page;
    cargarPagina(paginaActual);
  });
});
