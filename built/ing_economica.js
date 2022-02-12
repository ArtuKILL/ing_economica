"use strict";
// import Mathjs = require('mathjs');
// import clipboardy = require('clipboardy');
// const { evaluate } = require("mathjs");
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandValues = exports.clipboardTable = exports.clipboardArray = exports.onlyLatex = exports.vidaEconomicaOptima = exports.raicesPolinomio2Grado = exports.balancesInversion = exports.recuperacionCapital = exports.criteroValorPresente = exports.resultadoFinal = exports.criterioValorPresenteResultados = exports.fDadoG = exports.pDadoA = exports.aDadoF = exports.pDadoF = exports.fDadoP = exports.fDadoA = exports.aDadoG = exports.pDadoG = exports.aDadoP = exports.ResultadoVidaEconomicaOptima = void 0;
var Mathjs = require("mathjs");
var clipboardy = require("clipboardy");
// export interface ResultadoVidaEconomicaOptima {
//   // TODO: Hacer refactor de los nombres...
//   año: number;
//   CostoTotalEquivalente: number;
//   CostoEquivalenteAnualDelActivo: number;
//   CostoEquivalenteAnualOperacionMantenimiento: number;
//   latexExpr: string;
// }
/**
 *
 */
var ResultadoVidaEconomicaOptima = /** @class */ (function () {
    /**
     *
     * @param {number} año
     * @param {number} costoTotalEquivalente
     * @param {number} costoEquivalenteAnualDelActivo
     * @param {number} costoEquivalenteAnualOperacionMantenimiento
     * @param {string} latexExpr
     */
    function ResultadoVidaEconomicaOptima(año, costoTotalEquivalente, costoEquivalenteAnualDelActivo, costoEquivalenteAnualOperacionMantenimiento, latexExpr) {
        if (año === void 0) { año = 0; }
        if (costoTotalEquivalente === void 0) { costoTotalEquivalente = 0; }
        if (costoEquivalenteAnualDelActivo === void 0) { costoEquivalenteAnualDelActivo = 0; }
        if (costoEquivalenteAnualOperacionMantenimiento === void 0) { costoEquivalenteAnualOperacionMantenimiento = 0; }
        if (latexExpr === void 0) { latexExpr = ' '; }
        this.año = año;
        this.costoTotalEquivalente = costoTotalEquivalente;
        this.costoEquivalenteAnualDelActivo = costoEquivalenteAnualDelActivo;
        this.costoEquivalenteAnualOperacionMantenimiento =
            costoEquivalenteAnualOperacionMantenimiento;
    }
    return ResultadoVidaEconomicaOptima;
}());
exports.ResultadoVidaEconomicaOptima = ResultadoVidaEconomicaOptima;
// test
/**
 *
 * @param {number} p Valor Presente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Anualidad
 */
function aDadoP(p, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return (p * (i * r)) / (r - 1);
}
exports.aDadoP = aDadoP;
/**
 *
 * @param {number} g Gradiente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Presente
 */
function pDadoG(g, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return g * ((1 / i) * ((r - 1) / i - n) * (1 / r));
}
exports.pDadoG = pDadoG;
/**
 *
 * @param {number} g Gradiente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Anualidad
 */
function aDadoG(g, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return g * (1 / i - n / (r - 1));
}
exports.aDadoG = aDadoG;
/**
 *
 * @param {number} a Anualidad
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Futuro
 */
function fDadoA(a, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return (a * (r - 1)) / i;
}
exports.fDadoA = fDadoA;
/**
 *
 * @param {number} p Valor Presente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Futuro
 */
function fDadoP(p, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return p * r;
}
exports.fDadoP = fDadoP;
/**
 *
 * @param {number} f Valor Futuro
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Perido
 * @return {number} Valor Presente
 */
function pDadoF(f, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return f / r;
}
exports.pDadoF = pDadoF;
/**
 *
 * @param {number} f Valor Futuro
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Anualidad
 */
function aDadoF(f, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return (f * i) / (r - 1);
}
exports.aDadoF = aDadoF;
/**
 *
 * @param {number} a Anualidad
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Presente
 */
function pDadoA(a, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return (a * (r - 1)) / (i * r);
}
exports.pDadoA = pDadoA;
/**
 * @param {number} g Gradiente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Futuro
 */
function fDadoG(g, i, n) {
    i /= 100;
    var r = Math.pow((1 + i), n);
    return g * ((1 / i) * ((r - 1) / i - n));
}
exports.fDadoG = fDadoG;
/**
 *  Para cada ciclo del periodo calcula el Valor Presente
 *  devuelve una lista de objetos con la clave "valor presente"
 *  para visualizarlo mejor en un cosole.table()
 *
 * @param {number[]} y Flujos de fondo
 * @param {number} i Interes
 * @return {ResultadoValorPresente[]} Lista de valores presentes en cada ciclo del periodo.
 */
function criterioValorPresenteResultados(y, i) {
    i /= 100;
    var resultados = [];
    y.reduce(function (acum, ySubT, t) {
        var wSubT = acum + ySubT / Math.pow((1 + i), t);
        var res = { 'valor presente': wSubT };
        resultados.push(res);
        return wSubT;
    }, 0);
    return resultados;
}
exports.criterioValorPresenteResultados = criterioValorPresenteResultados;
/**
 *  Devuelve el último resultado de la lista de Valores presentes
 * @param {ResultadoValorPresente[]} resultados Lista de los resultados de valor pres
 * @return {ResultadoValorPresente} Último resultado de la tabla
 */
function resultadoFinal(resultados) {
    return resultados.slice(-1)[0];
}
exports.resultadoFinal = resultadoFinal;
/**
 *
 * @param {number[]} y
 * @param {number} i
 * @return {ResultadoValorPresente}
 */
function criteroValorPresente(y, i) {
    var resultados = criterioValorPresenteResultados(y, i);
    console.table(resultados);
    return resultadoFinal(resultados);
}
exports.criteroValorPresente = criteroValorPresente;
/**
 * Devuelve el primer flujo en donde se recupere el dinero invertido, es decir,
 * cuando el valor sea 0 o mayor ????
 * TODO: REVISAR ESTO NO CONFIO EN EL ARTURO DEL PASADO!!!😴
 * @param {number[]} y Flujos de fondo del proyecto.
 * @param {number} i Interés
 * @return {number} Ciclo en que se recupera el capital
 */
function recuperacionCapital(y, i) {
    var resultados = criterioValorPresenteResultados(y, i);
    var resultadosNum = resultados.map(function (resultado) { return resultado['valor presentr']; });
    resultadosNum.reduce(function (acum, numero, index) {
        if (acum < numero) {
            acum = numero;
            return index;
        }
    }, 0);
    return 0;
}
exports.recuperacionCapital = recuperacionCapital;
/**
 *
 * @param {number[]} y Flujos de fondo del proyecto
 * @param {number} i
 * @return {number}
 */
function balancesInversion(y, i) {
    i /= 100;
    var anterior;
    return y.map(function (fondo, index) {
        if (index === 0) {
            anterior = fondo;
            return fondo;
        }
        anterior = anterior * i + anterior + fondo;
        return anterior;
    });
}
exports.balancesInversion = balancesInversion;
/**
 * Implementación de la formula cuadrática
 * Note: Esto esta pal perro
 * @param {number} a [a]x^2+bx+c = 0
 * @param {number} b ax^2+[b]x+c = 0
 * @param {number} c ax^2+bx+[c] = 0
 * @return {Raices} Raices del polinomio.
 */
function raicesPolinomio2Grado(a, b, c) {
    var raizCuadrada = Math.pow((Math.pow(b, 2) - 4 * a * c), (1 / 2));
    var raices;
    raices.positiva = (-1 * b + raizCuadrada) / (2 * a);
    raices.negativa = (-1 * b - raizCuadrada) / (2 * a);
    return raices;
}
exports.raicesPolinomio2Grado = raicesPolinomio2Grado;
/**
 *
 * @param {number} inversionIncial
 * @param {number[]} valoresResiduales
 * @param {number[]} costos
 * @param {number} i Tasa de interés [0%,100%]
 * @return {ResultadoVidaEconomicaOptima}
 */
function vidaEconomicaOptima(inversionIncial, valoresResiduales, costos, i) {
    var gradiente = Math.abs(costos[0] - costos[1]);
    // Esto no es una manera muy general que digamos para calcular el gradiente pero es lo que hay lo siento.
    // TODO Hacer un metodo general para detectar gradientes en costos y valores_residuales
    return valoresResiduales.map(function (valorResidual, t) {
        var año = t + 1;
        var resultadoVidaEconomica = new ResultadoVidaEconomicaOptima();
        var toFixedExpr = "".concat(aDadoP(inversionIncial, i, año).toFixed(2), " + ").concat(costos[0], " + ").concat(aDadoG(gradiente, i, año).toFixed(2), " - ").concat(aDadoF(valorResidual, i, año).toFixed(2));
        var terminos = toFixedExpr
            .split(' ')
            .filter(function (element) { return element != '+' && element != '-'; });
        var node = Mathjs.parse(toFixedExpr);
        var operacionMantenimiento = Mathjs.parse("".concat(terminos[1], "+").concat(terminos[2])).evaluate();
        operacionMantenimiento = parseFloat(operacionMantenimiento.toFixed(2));
        var resultado = node.evaluate();
        resultado = parseFloat(resultado.toFixed(2));
        resultadoVidaEconomica.costoTotalEquivalente = resultado;
        resultadoVidaEconomica.año = año;
        resultadoVidaEconomica.costoEquivalenteAnualDelActivo = parseFloat((resultado - operacionMantenimiento).toFixed(2));
        resultadoVidaEconomica.costoEquivalenteAnualOperacionMantenimiento =
            operacionMantenimiento;
        resultadoVidaEconomica.latexExpr = "$$A_{".concat(año, "} = ").concat(inversionIncial, "(A/P,").concat(i, "\\%,").concat(año, ") + ").concat(costos[0], " + ").concat(gradiente, "(A/G,").concat(i, "\\%,").concat(año, ") - ").concat(valorResidual, "(A/F,").concat(i, "\\%,").concat(año, ") = ").concat(toFixedExpr, " = ").concat(resultado.toFixed(2), "$$");
        return resultadoVidaEconomica;
    });
}
exports.vidaEconomicaOptima = vidaEconomicaOptima;
/**
 * Recibe una lista de resultados, especificamente, resultados de vida ecoñomica
 * y retorna solo la expresiones de LaTeX
 * TODO: este array debe ser más genrico
 * @param {ResultadoVidaEconomicaOptima[]} resultados
 * @return {string[]}
 */
function onlyLatex(resultados) {
    return resultados.map(function (element) { return element.latexExpr; });
}
exports.onlyLatex = onlyLatex;
/**
 * Copia un arreglo en el portapapeles en texto plano
 * Cambia las comas (,)  de los decimales por puntos (.) 9,3 -> 9.3
 * @param {any[]} array Arreglo de expresiones de LaTeX
 */
function clipboardArray(array) {
    var stringToCopy = array.reduce(function (acum, element) {
        return acum + element + '\n\n';
    }, '');
    clipboardy.writeSync(stringToCopy.replace(/\./g, ',').replace(/(\d+)(\d{3})/g, '$1' + '.' + '$2'));
    console.log('¡Se ha copiado con exito!');
}
exports.clipboardArray = clipboardArray;
/**
 * Copia en formato de google sheets los resultados
 * TODO: Encontrar una manera más genrica, que no solo parsee Resultados de vida
 * economica.
 * @param {ResultadoVidaEconomicaOptima[]}array
 */
function clipboardTable(array) {
    var stringToCopy = array.reduce(function (acum, element) {
        return (acum +
            "".concat(element.año, "\t").concat(element.costoEquivalenteAnualDelActivo, "\t").concat(element.costoEquivalenteAnualOperacionMantenimiento, "\t").concat(element.costoTotalEquivalente, "\n"));
    }, 
    // Titulos de la tabla, estar pendiente a la hora de hacerlo más generico
    'Año\tCosto Equivalente Anual del Activo\tCosto Equivalente Anual Operacion y Mantenimiento\tCosto Total Equivalente\n');
    clipboardy.writeSync(stringToCopy.replace(/\./g, ',').replace(/(\d+)(\d{3})/g, '$1' + '.' + '$2'));
    // clipboardy.writeSync(stringToCopy);
    console.log('¡Se ha copiado con exito!');
}
exports.clipboardTable = clipboardTable;
/**
 *  Expande los valores hasta que el arreglo de valores llegue
 * @param {number} valores
 * @param {number} costos
 * @return {Array<Array<number>>} costos = [0] y valores = [1]
 */
function expandValues(valores, costos) {
    var gradienteValores = Math.abs(valores[0] - valores[1]);
    var gradienteCostos = Math.abs(costos[0] - costos[1]);
    console.log(gradienteValores);
    console.log(gradienteCostos);
    while (valores.slice(-1)[0] > 0) {
        valores.push(valores.slice(-1)[0] - gradienteValores);
        costos.push(costos.slice(-1)[0] + gradienteCostos);
    }
    return [valores, costos];
}
exports.expandValues = expandValues;
/**
 * Entry-point
 */
function main() {
    console.log('Ing_economica on TS   v1.0.0');
}
main();
