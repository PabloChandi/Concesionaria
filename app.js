let autos = require('./autos');
let personas = require('./personas');

let concesionaria = {
   autos: autos,
   personas: personas,
 
   buscarAuto: function (patente) {
      let buscar = autos.filter((auto) => auto.patente === patente);
      let devolver = buscar[0]!=undefined?buscar[0]:null
      return devolver
   },

   venderAuto: function (patente) {
      let buscar = this.buscarAuto(patente).vendido=true;
      return buscar;
   },

  autosParaLaVenta: function () {
    let buscar = autos.filter((auto) => auto.vendido !== true);
    return buscar;
  },

  autosNuevos: function () {
    let buscar = this.autosParaLaVenta().filter((auto) => auto.km < 100);
    return buscar;
  },

   listaDeVentas: function(){
     let lista=autos.filter((auto)=>auto.vendido===true);
     let precios=lista.map((auto)=>auto.precio)
     return precios
   },

   totalDeVentas: function () {
      let preciosVendidos = this.listaDeVentas().length !== 0?
         this.listaDeVentas().reduce((acc, valor) => acc + valor)
         : 0;
      return preciosVendidos;
   },
   
   puedeComprar:function(auto, persona){
      let pagodeCuotas = persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas) ? true : false;

      let pagoTotal = persona.capacidadDePagoTotal >= auto.precio ? true : false;

      let resultado = pagodeCuotas == true && pagoTotal == true ? true : false;

      return resultado;
   },

   autosQuePuedeComprar: function(persona){
      let disponibles = this.autosParaLaVenta().filter((auto) => this.puedeComprar(auto,persona) == true)
      return disponibles
   }  
}

console.log(concesionaria.autosQuePuedeComprar("Juan"))