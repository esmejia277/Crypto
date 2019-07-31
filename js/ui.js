class Interfaz {

     constructor() {
          this.init();
     }
     init() {
          this.construirSelect();
     }

     construirSelect() {
          cotizador.obtenerMonedasAPI()
               .then(monedas => {
                    const select = document.querySelector('#criptomoneda');
                    for( const [key, value] of Object.entries(monedas.monedas.Data) ) {
                         const opcion = document.createElement('option');
                         opcion.value = value.Symbol;
                         opcion.appendChild(document.createTextNode(value.CoinName));
                         select.appendChild(opcion);
                    }

               })
     }

     mostrarMensaje(mensaje, clases) {
          const div = document.createElement('div');
          div.className = clases;
          div.appendChild(document.createTextNode(mensaje));

          const divMensaje = document.querySelector('.mensajes');
          divMensaje.appendChild(div);

          setTimeout(() => {
               document.querySelector('.mensajes div').remove();
          }, 3000);
     }

     mostrarResultado(resultado, moneda, crypto){
          const resultadoAnterior = document.querySelector('#resultado > div');
          if(resultadoAnterior) {
               resultadoAnterior.remove();
          }
          const datosMoneda = resultado[crypto][moneda];
          console.log(datosMoneda);
          let precio = datosMoneda.PRICE.toFixed(2),
               porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
               actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');
          let templateHTML = `
               <div class="card bg-warning">
                    <div class="card-body text-light">
                         <h2 class="card-title">Resultado:</h2>
                         <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                         <p>Variación último día: %${porcentaje}</p>
                         <p>Última Actualización: ${actualizado}</p>
                    </div>
               </div>
          `;

          this.mostrarOcultarSpinner('block');

         setTimeout(() => {
               document.querySelector('#resultado').innerHTML = templateHTML;

               this.mostrarOcultarSpinner('none');
         }, 3000);
     }

     mostrarOcultarSpinner(vista) {
          const spinner = document.querySelector('.contenido-spinner');
          spinner.style.display = vista;
     }
}