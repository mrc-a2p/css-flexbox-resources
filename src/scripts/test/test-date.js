// //Antes
// // var fecha = new Date(),
// //   hora = fecha.getHours();

// // var saludo = function (hr) {
// //   if (hr <= 5) {
// //     return 'No me jodas!!!';
// //   } else if(hr >= 6 && hr <= 11) {
// //     return 'Buenos días!!!';
// //   } else if(hr >= 12 && hr <= 18) {
// //     return 'Buenas tardes!!!';
// //   } else {
// //     return 'Buenas noches!!!';
// //   }
// // };

// // console.log( saludo(hora) ); //Imprime el saludo dependiendo la hora del día
// // 
// //Ahora
// let fecha = new Date(),
//   hora = fecha.getHours();

// let saludo = (hr) => {
//   if (hr <= 5) {
//     return 'No me jodas!!!';
//   } else if(hr >= 6 && hr <= 11) {
//     return 'Buenos días!!!';
//   } else if(hr >= 12 && hr <= 18) {
//     return 'Buenas tardes!!!';
//   } else {
//     return 'Buenas noches!!!';
//   }
// };

// console.log( saludo(hora) ); //Imprime el saludo dependiendo la hora del día

// //Antes
// // var numeros = [1, 2, 3, 4];

// // numeros.forEach(function (num) {
// //   console.log(num); //Imprime el número en turno
// //   console.log(num * 10); //Imprime el número en turno por 10
// // });

// //Ahora
// let numeros = [1, 2, 3, 4];

// numeros.forEach((num) => {
//   console.log(num); //Imprime el número en turno
//   console.log(num * 10); //Imprime el número en turno por 10
// });