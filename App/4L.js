var rojo = true;
var tablero = [0, 0, 0, 0, 0, 0];
for (var i = 0; i < tablero.length; i++) {
    tablero[i] = ['V', 'V', 'V', 'V', 'V', 'V', 'V'];
}
console.log(JSON.stringify(tablero));

function sumarFila(numeroDeFila) {
    var fila = "";
    for (var i = 0; i < tablero[numeroDeFila].length; i++) {
        fila = fila + tablero[numeroDeFila][i];
    }
    return fila;
}

function sumarColumna(numeroDeColumna) {
    var fila = "";
    for (var i = 0; i < tablero.length; i++) {
        fila = fila + tablero[i][numeroDeColumna];
    }
    return fila;
}
var partidasA = [[2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [0, 3]];

function sumarDiagonalA(puntoDePartida) {
    var fila = puntoDePartida[0];
    var columna = puntoDePartida[1];
    var celda = 1;
    var fila2 = "";
    for (var i = 0; i < 7; i++) {
        if (tablero[fila + i]) {
            if (tablero[fila + i][columna + i]) {
                celda = tablero[fila + i][columna + i];
                fila2 = fila2 + celda;
            }
        }
    }
    return fila2;
}

var partidasB = [[2, 6], [1, 6], [0, 6], [0, 5], [0, 4], [0, 3]];

function sumarDiagonalB(puntoDePartida) {
    var fila = puntoDePartida[0];
    var columna = puntoDePartida[1];
    var celda = 1;
    var fila3 = "";
    for (var i = 0; i < 7; i++) {
        if (tablero[fila + i]) {
            if (tablero[fila + i][columna - i]) {
                celda = tablero[fila + i][columna - i];
                fila3 = fila3 + celda;
            }
        }
    }
    return fila3;
}

function drawTable() {
    var tableBody = document.getElementById('4Ltable');
    tableBody.innerHTML="";
    tablero.forEach(function (rowData) {
        var row = document.createElement('tr');
        var i = 0;
        rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            if (cellData == "R")
                cell.innerHTML = '<div class="celda"<div class="Rojo"><div class="elipse"></div><div class="cuatro">4</div></div></div>';
            else if (cellData == "A")
                cell.innerHTML = '<div class="celda"<div class="Amarillo"><div class="elipse2"></div><div class="cuatro2">4</div></div></div>';
            
            var k = i;
            cell.addEventListener("click", function (e) {
                var i = getPrimer(k);
                if (rojo == true)
                    tablero[i][k] = "R";
                else
                    tablero[i][k] = "A";
                drawTable();
                rojo = !rojo;
                cursor();
            });
            i++;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}



function getPrimer(columna) {
    var i = -1;
    tablero.forEach(function (row, index) {
        row.forEach(function (cell, number) {
            if (cell == "V" && columna == number)
                i = index
        });
    });
    return i;

}

function cursor() {
    if (rojo == true) {
        $("#color").attr("class", "Rojo");
        $("#elipse").attr("class", "elipse");
        $("#cuatro").attr("class", "cuatro");
    } else {
        $("#color").attr("class", "Amarillo");
        $("#elipse").attr("class", "elipse2");
        $("#cuatro").attr("class", "cuatro2");
    }
}

$(document).on('mousemove', function (e) {
    $('#cursor').css({
        left: e.pageX,
        top: e.pageY
    });
});

$(document).ready(function () {
    drawTable();
    cursor();
});
