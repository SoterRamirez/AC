//Variables Globales
var renglones = 200; //Renglones de la matriz.
var columnas = 200; //Columnas de la matriz.
var tamCelulas = 4; //Tamaño gráfico de las cólulas. Normalmente es 4
var espacioCelulas = 0; //Espacio gráfico entre cada c�lula. Funciona bien con 0.6 #experimental
var porcentajeVida = 0.4; //El porcentaje de vida inicial en el mapa.//0.5 para grids peque�os. 0.1 est� bien para grids grandes.
var tiempoTicks = 0; //Frecuencia con la que se calcula la vida. Despu�s de cierto tama�o del mapa, se ignora esto.
var cantidadGeneraciones = 0; //Contador de las generaciones en cada simulaci�n.
var celulas = [new Array(renglones)]; //console.log(celulas);//Contiene la informaci�n de cada c�lula.
var celulasTemp; //Aqui se almacena el estado calculado de cada c�lula.
var ctx; //Contexto del objeto canvas.
var cantidadColonias = 0; //Las colonias que son formadas por c�lulas.

//Control
$(document).ready(function() {
  var funcionTiempo; //Contiene el control del tiempo.
  generarUniverso();

  $(".tick").click(function(event) {
    event.preventDefault();
    console.log("Se avanza un tick en el tiempo.");
    hacerTick();
  });

  $(".iniciar").click(function(event) {
    event.preventDefault();
    console.log("El tiempo se echa a andar.");
    window.clearInterval(funcionTiempo); //Se detiene cualquier otro ciclo anterior.
    funcionTiempo = window.setInterval(hacerTick, tiempoTicks); //El tiempo se echa a andar.
  });

  $(".detener").click(function(event) {
    event.preventDefault();
    console.log("Se detiene la simulación");
    window.clearInterval(funcionTiempo);
  });

  $(".reiniciar").click(function(event) {
    event.preventDefault();
    console.log("Se reinicia la vida en el universo");
    generarUniverso();
  });
});
