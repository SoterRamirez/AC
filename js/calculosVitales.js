//Modelo
//var colonia = [];
//var celulaEjemplo = JSON.parse('{"id":0, "renglon":0, "columna":0, "estado":1}');
//colonia.push(celulaEjemplo);
//celulaEjemplo = JSON.parse('{"id":1, "renglon":0, "columna":1, "estado":1}');
//colonia.push(celulaEjemplo);
//celulaEjemplo = JSON.parse('{"id":2, "renglon":1, "columna":0, "estado":1}');
//colonia.push(celulaEjemplo);
//celulaEjemplo = JSON.parse('{"id":3, "renglon":1, "columna":1, "estado":1}');
//colonia.push(celulaEjemplo);//Se agrega un cuadrito de c�lulas.
//colonias = [new Array()];
//colonias.push(colonia);
//
//celulaEjemplo = JSON.parse('{"id":3, "renglon":1, "columna":1, "estado":1}');
//var celulaBuscada = buscarCelulaEnColonia(celulaEjemplo, colonia);
//console.log(colonia);
//console.log("Se busc� la c�lula " + JSON.stringify(celulaEjemplo) + " y se encontr� " + JSON.stringify(celulaBuscada));

/*
 Descripci�n:   Genera un arreglo 2D de X renglones y Y columnas.
 Par�metros:    int renglones: La cantidad de renglones de alto que tiene la matriz; int columnas: La cantidad de columnas de ancho que tiene la matriz.
 Regreso:       arreglo2D matriz. La matriz generada.
 */
function generarMatrizVida(/*int*/ renglones, /*int*/ columnas) {
    var matriz = [new Array(renglones)];
    for (var cont = 0; cont < renglones; cont++) {//Renglones
        var arregloInterno = [];//Ser� un rengl�n.
        for (var cont2 = 0; cont2 < columnas; cont2++) {//Columnas
            var identificador = ((cont * columnas) + cont2);//Se calcula el id de cada c�lula.
            var celula = '{"id":' + identificador + ', "renglon":' + cont + ', "columna":' + cont2 + ', "estado":0, "colonia":-1}'; //console.log("Se crea la c�lula:" + celula);
            arregloInterno[cont2] = JSON.parse(celula);
        }
        matriz[cont] = arregloInterno;//Se agrega el rengl�n nuevo a la matriz.
    }
    return matriz;
}

/*
 Descripci�n:   Recorre una matriz y le aplica una funci�n.
 Par�metros:    arreglo2D matriz: La matriz que se recorrer�; int renglones: Y de la matriz; int columnas: X de la matriz.
 Regreso:       Ninguno.
 */
function recorrerMatriz(/*arreglo2D*/ matriz, /*int*/ renglones, /*int*/ columnas, /*Funci�n JS*/ miFuncion) {
    for (var cont = 0; cont < renglones; cont++) {//Renglones
        for (var cont2 = 0; cont2 < columnas; cont2++) {//Columnas
            miFuncion(matriz[cont][cont2]);//Se aplica la funci�n a la c�lula actual.
        }
    }
}

function generarUniverso() {
    columnas = document.getElementById("columnas").value;
    renglones = document.getElementById("renglones").value;
    tamCelulas = document.getElementById("tamanio").value;
    porcentajeVida = document.getElementById("porcentaje").value;

    if (isNaN(columnas)) {
        columnas = 20;
    }
    if (isNaN(renglones)) {
        renglones = 20;
    }
    if (isNaN(tamCelulas)) {
        tamCelulas = 4;
    }
    if (isNaN(porcentajeVida)) {
        porcentajeVida = 0.4;
    }

    cantidadTotalCelulas = renglones * columnas;
    cantidadCelulasInicialesVivas = cantidadTotalCelulas * porcentajeVida;
    console.log("Renglones:" + renglones + " Columnas:" + columnas);

    cantidadGeneraciones = 0;
    cantidadColonias = 0;
    //$(".informacion").html("Generaci&oacute;n: " + cantidadGeneraciones + "<br>Cantidad de colonias: " + cantidadColonias);
    celulas = generarMatrizVida(renglones, columnas);//console.log(celulas);//Se genera la matriz donde se guarda la informaci�n de las c�lulas.
    celulasTemp = generarMatrizVida(renglones, columnas);//Se genera la matriz en donde se guarda el c�lculo de la siguiente generaci�n.
    var c = document.getElementById("mapa");//Se obtiene el mapa donde se despliega la vida.
    c.width = columnas * tamCelulas;// + (espacioCelulas * columnas);//Se calcula el tama�o del mapa en base a la cantidad de c�lulas que tiene.
    c.height = renglones * tamCelulas;// + (espacioCelulas * renglones);
    ctx = c.getContext("2d");
    exterminarVida(celulas);//Se reinicia el mapa.
    generarVida(celulas, cantidadCelulasInicialesVivas);//Se genera vida nueva de manera aleatoria.
    recorrerMatriz(celulas, renglones, columnas, encontrarColonias);//Se analiza la cantidad de colonias existentes.    
    recorrerMatriz(celulas, renglones, columnas, pintarCambios);//Se pinta por primera vez el mapa.
    $(".informacion").html("Generaci&oacute;n: " + cantidadGeneraciones + "<br>Cantidad de colonias: " + cantidadColonias);

}

/*
 Descripci�n:   Evento apocal�tico que deja todas las c�lulas muertas :(
 Par�metros:    arreglo2D matriz: La matriz en la que se exterminar� la vida.
 Regreso:       Ninguno.
 */
function exterminarVida(/*matriz*/ matriz) {
    recorrerMatriz(matriz, renglones, columnas, matarCelula);
}

/*
 Descripci�n:   Genera c�lulas vivas al azar. Aqui se genera la semilla aleatoriamente.
 Par�metros:    arreglo2D matriz: La matriz en la que se generar� la vida :) int cantidadCelulasInicialesVivas.
 Regreso:       Ninguno.
 */
function generarVida(matriz, cantidadCelulasInicialesVivas) {
    var unidades = 0;//Coordenadas de las c�lulas a revivir.
    var decenas = 0;
    console.log("La cantidad de vida inicial es " + cantidadCelulasInicialesVivas);
    for (var cont = 0; cont <= cantidadCelulasInicialesVivas; cont++) {
        decenas = Math.floor(Math.random() * (renglones));
        unidades = Math.floor(Math.random() * (columnas));
        revivirCelula(matriz[decenas][unidades]);
        //console.log('Se revive a la c�lula: [' +decenas + ',' + unidades+']');
    }
}

/*
 Descripci�n:   Avanza una iteraci�n de c�lculos en las c�lulas.
 Par�metros:    Ninguno.
 Regreso:       Ninguno.
 */
function hacerTick() {
    cantidadColonias = 0;
    copiarMatriz(celulas, celulasTemp);//Se copia la matriz en la que se almacenan los c�lculos.
    recorrerMatriz(celulas, renglones, columnas, calcularEstado);//Se calcula el estado de cada c�lula.
    copiarMatriz(celulasTemp, celulas);//Se aplica el c�lculo a la matriz original.
    recorrerMatriz(celulas, renglones, columnas, encontrarColonias);//Se analiza la cantidad de colonias existentes.
    cantidadGeneraciones++;
    recorrerMatriz(celulas, renglones, columnas, pintarCambios);//Se despliegan los cambios.
    $(".informacion").html("Generaci&oacute;n: " + cantidadGeneraciones + "<br>Cantidad de colonias: " + cantidadColonias);
}

/*
 Descripci�n:   Se calcula el siguiente estado de cada c�lula basado en el estado de las c�lulas vecinas.
 Par�metros:    objJSON celula: La celula a la que se le calcula el estado.
 Regreso:       Ninguno.
 */
function calcularEstado(/*objJSON*/ celula) {
    //console.log("Se calcula el estado de la c�lula " + JSON.stringify(celula));
    var b = 3;//3
    var s = [2, 3];//2,3
    var cantidadVecinosVivos = ContarVecinosVivos(celula);
    if (cantidadVecinosVivos < s[0] && esCelulaViva(celula)) {
        matarCelula(celulasTemp[celula.renglon][celula.columna]); //Se muere por falta de poblaci�n
    }
    if ((cantidadVecinosVivos === s[0] || cantidadVecinosVivos === s[1]) && esCelulaViva(celula)) {
        revivirCelula(celulasTemp[celula.renglon][celula.columna]); //Se queda viva
    }
    if (cantidadVecinosVivos > s[1] && esCelulaViva(celula)) {
        matarCelula(celulasTemp[celula.renglon][celula.columna]); //Se muere por sobrepoblaci�n
    }
    if (cantidadVecinosVivos === b && !esCelulaViva(celula)) {
        revivirCelula(celulasTemp[celula.renglon][celula.columna]); //Revive por reproducci�n
    }
    //console.log("Se reinicia la colonia de la c�lula:" + JSON.stringify(celulasTemp[celula.renglon][celula.columna]));
    (celulasTemp[celula.renglon][celula.columna]).colonia = -1; //Revive por reproducci�n
}

/*
 Descripci�n:   Analiza y reconoce conjuntos de c�lulas para agruparalas en colonias.
 Par�metros:    objJSON celula: La celula a la que se le busca una colonia.
 Regreso:       Ninguno.
 */
function encontrarColonias(/*objJSON*/ celula, /*objJSON*/ celulaPadre) {
    if (celula.estado !== 1) {
        return;
    }
    //console.log("Se busca las colonia de la c�lula:" + JSON.stringify(celula));
    if (celula.colonia !== -1) {//Pertenece a una colonia
        //console.log("Ya pertenece a la colonia " + celula.colonia + ", no se revisa.");
        return;//Ya pertenece a una colonia
    } else {//No pertenece a una colonia
        //if (celulaPadre !== undefined){//Tiene un padre
        if (typeof celulaPadre !== 'undefined') {//Tiene un padre
            //console.log("Tiene padre de la colonia:" + celulaPadre.colonia);
            celula.colonia = celulaPadre.colonia;
        } else {//Es hu�rfano, inicia una colonia nueva.
            var nuevaColonia = Math.random() * (255);
            cantidadColonias++;
            //console.log("Funda la colonia:" + nuevaColonia);
            celula.colonia = nuevaColonia;
        }
        var celulasVecinas = obtenerCelulasVecinas(celula);

        for (var cont2 = 0; cont2 < celulasVecinas.length; cont2++) {//Por cada celula vecina
            var celulaVecina = celulasVecinas[cont2];
            if (celulaVecina.id !== -1 && celulaVecina.estado === 1 && !comparaCelula(celulaVecina, celulaPadre)) {//Si es c�lula vecina v�lida y viva, y no su padre.
                encontrarColonias(celulaVecina, celula);
            }
        }
    }
//    pertenezco a una colonia?
//    tengo padre?
//    por cada vecino
}

/*
 Descripci�n:   Cuenta las 8 c�lulas vecinas vivas de una c�lula.
 Par�metros:    objJSON celula: La celula a la que se le contar�n los vecinos vivos.
 Regreso:       int contadorVecinos: Cantidad de vecinos vivos.
 */
function ContarVecinosVivos(/*objJSON*/ celula) {
    var contadorVecinos = 0;
    //console.log("ContarVecinosVivos: Se van a revisar los vecinos de la celula" + JSON.stringify(celula));
    var vecinos = [];
    vecinos = obtenerCelulasVecinas(celula);

    for (var cont = 0; cont < vecinos.length; cont++) {
        if (vecinos[cont].id !== -1) {//Si existe el vecino
            if (esCelulaViva(vecinos[cont])) {
                contadorVecinos++;
            }
        }
    }
    return contadorVecinos;
}

/*
 Descripci�n:   Obtiene las 8 c�lulas vecinas vivas de una c�lula.
 Par�metros:    objJSON celula: La celula a la que se le obtendr�n sus vecinos vivos.
 Regreso:       arreglo vecinos: Arreglo con los vecinos vivos.
 */
function obtenerCelulasVecinas(/*objJSON*/ celula) {
    var vecinos = [];
    vecinos.push(obtenerCelula(celula.renglon - 1, celula.columna - 1));
    vecinos.push(obtenerCelula(celula.renglon - 1, celula.columna));
    vecinos.push(obtenerCelula(celula.renglon - 1, celula.columna + 1));
    vecinos.push(obtenerCelula(celula.renglon, celula.columna - 1));
    vecinos.push(obtenerCelula(celula.renglon, celula.columna + 1));
    vecinos.push(obtenerCelula(celula.renglon + 1, celula.columna - 1));
    vecinos.push(obtenerCelula(celula.renglon + 1, celula.columna));
    vecinos.push(obtenerCelula(celula.renglon + 1, celula.columna + 1));
    return vecinos;
}

/*
 Descripci�n:   Regresa la c�lula de cierta cordenada.
 Par�metros:    int renglon; int columna: Las coordenadas de la c�lula a regresar.
 Regreso:       objJSON celula: La c�lula encontrada en cierta posici�n.
 */
function obtenerCelula(/*int*/ renglon, /*int*/ columna) {
    var celula = JSON.parse('{"id":-1, "renglon":-1, "columna":-1, "estado":0, "colonia":-1}');//C�lula dummy
    if (renglon >= 0 && columna >= 0 && renglon < renglones && columna < columnas) {
        try {
            celula = celulas[renglon][columna];
        }
        catch (error) {
            //console.log("obtenerCelula: No existe la c�lula ["+renglon+","+columna+"]. Se regresa una c�lula finada.");
        }
    }
    //console.log("obtenerCelula: Se regresa la c�lula ["+renglon+","+columna+"]:" + JSON.stringify(celula));
    return celula;
}

/*
 Descripci�n:   Verifica si la c�lula est� vida.
 Par�metros:    objJSON celula.
 Regreso:       boolean.
 */
function esCelulaViva(/*objJSON*/ celula) {
    //console.log("esCelulaViva: Se verifica si la celula " + JSON.stringify(celula) + " est� viva");
    if (celula.estado === 1) {
        return true;
    }
    return false;
}

/*
 Descripci�n:   Remueve la vida de una c�lula :(
 Par�metros:    objJSON celula.
 Regreso:       Ninguno.
 */
function matarCelula(/*objJSON*/ celula) {
    //console.log("matarCelula: Se mata la celula " + JSON.stringify(celula));
    celula.estado = 0;
}

/*
 Descripci�n:   Otorga la vida a una c�lula :)
 Par�metros:    objJSON celula.
 Regreso:       Ninguno.
 */
function revivirCelula(/*objJSON*/ celula) {
    //console.log("revivirCelula: Se revive la celula " + celula);
    celula.estado = 1;
}

/*
 Descripci�n:   Compara dos c�lulas.
 Par�metros:    objJSON celulaOriginal; objJSON celulaComparada.
 Regreso:       boolean.
 */
function comparaCelula(/*objJSON*/celulaOriginal, /*objJSON*/celulaComparada) {
    if (typeof celulaOriginal !== 'undefined' || typeof celulaComparada !== 'undefined') {//No recibi� una c�lula con la cual comparar.
        return false;
    }
    if (celulaOriginal.columna === celulaComparada.columna && celulaOriginal.renglon === celulaComparada.renglon) {
        return true;
    }
    return false;
}

/*
 Descripci�n:   Despliega los cambios del estado de las c�lulas en la pantalla.
 Par�metros:    objJSON celula: La celula a ser desplegada.
 Regreso:       Ninguno.
 */
function pintarCambios(/*objJSON*/celula) {
    var x = celula.columna * tamCelulas;//Calcula la posici�n de la c�lula en el canvas.
    var y = celula.renglon * tamCelulas;
    var x1 = tamCelulas - espacioCelulas;
    var y1 = tamCelulas - espacioCelulas;
    //console.log("Cordenadas celula:" + celula.renglon+","+celula.columna + " " + celula.estado);
    //console.log("Cordenadas gr�ficas:" + x+","+y+"|"+x1+","+y1);
    if (celula.estado === 0) {//Varía el colo de la célula de acuerdo a su estado.
        ctx.fillStyle = "#607D8B";
    } else if (celula.estado === 1) {
        var cadena = Math.floor(celula.colonia);
        cadena = cadena.toString(16);
        cadena = formatearCadena(cadena);
        //console.log(cadena);
        if (cadena !== "00") {
            cadena = "#00AC" + cadena;
        } else {
            cadena = "#448AFF";
        }
        ctx.fillStyle = cadena;
    }
    ctx.fillRect(x, y, x1, y1);//Rellena la célula del color elegido.
    if (celula.colonia !== -1) {//Lo uso para desplegar informaci�n acerca de la c�lula.
        //console.log("Se pinta la c�lula:" + JSON.stringify(celula));
        //ctx.fillStyle = "#000";
        //ctx.font = "10px Arial";
        //ctx.fillText(celula.colonia, (x + tamCelulas / 2), (y + tamCelulas / 2));
    }
}

/*
 Descripci�n:   Copia los estados de las c�lulas de una matriz a otra.
 Par�metros:    arreglo2D matrizOriginal: La matriz de la cual se copian los estados.
 arreglo2D matrizCopia: La matriz en la que se copian los estados.
 Regreso:       Ninguno. Los cambios se hacen ah� mismo.
 */
function copiarMatriz(/*arreglo2D*/matrizOriginal, /*arreglo2D*/ matrizCopia) {
    for (var cont = 0; cont < renglones; cont++) {//Renglones
        for (var cont2 = 0; cont2 < columnas; cont2++) {//Columnas
            (matrizCopia[cont][cont2]).estado = (matrizOriginal[cont][cont2]).estado;
            (matrizCopia[cont][cont2]).colonia = (matrizOriginal[cont][cont2]).colonia;
        }
    }
}

/*
 Descripci�n:   Verifica que la cadena tenga al menos dos caracteres.
 Par�metros:    String cadena: Cadena a verificar
 Regreso:       String, cadena verificada.
 */
function formatearCadena(/*string*/ cadena) {
    var cadenaFormateada = cadena;
    if (cadena.length < 2) {
        cadenaFormateada = "0" + cadena;
    }
    return cadenaFormateada;
}