// //El problema de `this` Antes
// function Persona(nombre) {
//     //El constructor Persona() define `this` como una instancia de él mismo
//     this.nombre = nombre;
//     this.edad = 0;
  
//     setInterval(function () {
//       //La función anónima define `this` como una instancia de ella misma
//       this.edad++;
//     }, 1000);
//   }
  
//   var jon = new Persona('Jonathan');
//   console.log(jon); //Imprime la edad en 0 por cada segundo que pasa
  
//   //La solución al problema de `this` Antes
//   function Persona(nombre) {
//     //Se declara una variable self (algunos prefieren that) para guardar el `this` del constructor Persona()
//     var self = this;
  
//     self.nombre = nombre;
//     self.edad = 0;
  
//     setInterval(function () {
//       //La función anónima define su propio `this` pero el valor que aumenta es edad del `this` de Persona()
//       self.edad++;
//     }, 1000);
//   }
  
//   var jon = new Persona('Jonathan');
//   console.log(jon); //Imprime el valor de edad más uno por cada segundo que pasa
  
//   //La solución al problema de `this` Ahora
//   function Persona(nombre) {
//     //El constructor Persona() define `this` como una instancia de él mismo
//     this.nombre = nombre;
//     this.edad = 0;
  
//     setInterval(() => {
//       //`this` hace referencia al objeto Persona()
//       this.edad++;
//     }, 1000);
//   }
  
//   const jon = new Persona('Jonathan');
//   console.log(jon); //Imprime el valor de edad más uno por cada segundo que pasa
//   console.log(jon.edad); //Imprime la edad