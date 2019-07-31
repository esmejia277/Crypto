const cotizador = new API('a19a5eec1b711cd8eb4b6787907eb1641ed2c7f442da664f1be4c1c353f24c12');
const ui = new Interfaz();

const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', (e) => {
     e.preventDefault();

     const monedaSelect = document.querySelector('#moneda');
     const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

     const criptoMonedaSelect = document.querySelector('#criptomoneda');
     const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

     if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
          ui.mostrarMensaje('Ambos Campos son Obligatorios', 'alert bg-danger text-center');
     } else {
          cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
               .then(data => {
                    ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
               })
     }
})