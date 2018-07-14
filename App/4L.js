var rojo = true;
var cursorE = false;
var pRojo = "";
var pAmarillo = "";
var aCrono = 0;
var rCrono = 0;
var offset = Date.now();
var offset2 = Date.now();
var ranking = JSON.parse(localStorage.getItem("ranking"));
if (ranking == null)
    ranking = [];
localStorage.setItem("ranking", JSON.stringify(ranking));
if (!tablero) {
    var tablero = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < tablero.length; i++) {
        tablero[i] = ['V', 'V', 'V', 'V', 'V', 'V', 'V'];
    }
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
    tableBody.innerHTML = "";
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
                if (cursorE == true) {
                    

                    function onComplete() {
                        if (rojo == true)
                            tablero[i][k] = "R";
                        else
                            tablero[i][k] = "A";
                        drawTable();
                        $('#cursor').css({
                            left: old.left,
                            top: old.top
                        });
                        cursorE = true;
                        rojo = !rojo;
                        offset = Date.now();
                        offset2 = Date.now();
                        cursor();
                    }
                    var i = getPrimer(k);
                    var x = 0 + 121 * (k + 0.5);
                    var y = 0 + 94 * (i + 0.5);
                    var old = $('#cursor').position();
                    if (i>-1) {
                        cursorE = false;
                        $("#cursor").animate({
                            left: x.toString() + 'px'
                        }, "fast");
                        $("#cursor").animate({
                            top: y.toString() + 'px'
                        }, "slow", onComplete);
                    }

                }
            });
            i++;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
    check();
}

function check() {

    for (i = 0; i < 6; i++) {
        if (sumarFila(i).indexOf("RRRR") >= 0)
            gano(pRojo, rCrono);
        if (sumarFila(i).indexOf("AAAA") >= 0)
            gano(pAmarillo, aCrono);
    }
    for (i = 0; i < 7; i++) {
        if (sumarColumna(i).indexOf("RRRR") >= 0)
            gano(pRojo, rCrono);
        if (sumarColumna(i).indexOf("AAAA") >= 0)
            gano(pAmarillo, aCrono);
    }
    partidasA.forEach(function (item) {
        if (sumarDiagonalA(item).indexOf("AAAA") >= 0)
            gano(pAmarillo, aCrono);
        if (sumarDiagonalA(item).indexOf("RRRR") >= 0)
            gano(pRojo, rCrono);
    });
    partidasB.forEach(function (item) {
        if (sumarDiagonalB(item).indexOf("AAAA") >= 0)
            gano(pAmarillo, aCrono);
        if (sumarDiagonalB(item).indexOf("RRRR") >= 0)
            gano(pRojo, rCrono);
    });
}

function gano(player, crono) {
    ranking.push({
        jugador: player,
        segundos: crono
    });
    localStorage.setItem("ranking", JSON.stringify(ranking));
    swal({
        type: 'success',
        title: 'Felicitaciones ' + player + '!',
        text: 'Ha ganado en ' + Math.round(crono).toString() + ' segundos.',
        showConfirmButton: false,
        timer: 3000
    }).then((result) => {
        location.reload();

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
    $(".kred").trigger(
        'configure', {
            'min': 0,
            'max': 30 + 0.66 * (aCrono + rCrono)
        }
    );
    $(".kblue").trigger(
        'configure', {
            'min': 0,
            'max': 30 + 0.66 * (aCrono + rCrono)
        }
    );

    if (rojo == true) {
        $("#player").html(pRojo);
        $("#player").attr("class", "banner22");
        $("#color").attr("class", "Rojo");
        $("#elipse").attr("class", "elipse");
        $("#cuatro").attr("class", "cuatro");
    } else {
        $("#player").html(pAmarillo);
        $("#player").attr("class", "banner33");
        $("#color").attr("class", "Amarillo");
        $("#elipse").attr("class", "elipse2");
        $("#cuatro").attr("class", "cuatro2");
    }
}

$(document).on('mousemove', function (e) {
    if (cursorE == true) {
        $('#cursor').css({
            left: e.pageX,
            top: e.pageY
        });
    }
});

$(document).ready(function () {
    $("#game").hide();
});

function playBtn() {
    swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['R', 'A']
    }).queue([
     'Jugador Rojo',
  'Jugador Amarillo'
]).then((result) => {
        if (result.value) {
            pRojo = result.value[0];
            pAmarillo = result.value[1];
            console.log(result);
            $("#menu").hide();
            $("#game").show();
            drawTable();
            cursorE = true;
            cursor();
            offset2 = Date.now();
            offset = Date.now();
            $(".knob").knob({

            });
        }
    });

}

function clock() {
    var $c = $(".kcurrent"),
        $b = $(".kblue"),
        $r = $(".kred");
    var c = 30 - (Date.now() - offset) / 1000;
    if (rojo == true) {
        rCrono += (Date.now() - offset2) / 1000;
    } else {
        aCrono += (Date.now() - offset2) / 1000;
    }
    offset2 = Date.now();
    $c.val(c).trigger("change");
    $b.val(aCrono).trigger("change");
    $r.val(rCrono).trigger("change");
    setTimeout("clock()", 80);
}
clock();
