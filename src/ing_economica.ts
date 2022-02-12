// import Mathjs = require('mathjs');
// import clipboardy = require('clipboardy');
// const { evaluate } = require("mathjs");

import * as Mathjs from 'mathjs';
import * as clipboardy from 'clipboardy';

interface ResultadoValorPresente {
  'valor presente': number;
}

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
export class ResultadoVidaEconomicaOptima {
  año: number;
  costoTotalEquivalente: number;
  costoEquivalenteAnualDelActivo: number;
  costoEquivalenteAnualOperacionMantenimiento: number;
  latexExpr: string;

  /**
   *
   * @param {number} año
   * @param {number} costoTotalEquivalente
   * @param {number} costoEquivalenteAnualDelActivo
   * @param {number} costoEquivalenteAnualOperacionMantenimiento
   * @param {string} latexExpr
   */
  constructor(
    año: number = 0,
    costoTotalEquivalente: number = 0,
    costoEquivalenteAnualDelActivo: number = 0,
    costoEquivalenteAnualOperacionMantenimiento: number = 0,
    latexExpr: string = ' '
  ) {
    this.año = año;
    this.costoTotalEquivalente = costoTotalEquivalente;
    this.costoEquivalenteAnualDelActivo = costoEquivalenteAnualDelActivo;
    this.costoEquivalenteAnualOperacionMantenimiento =
      costoEquivalenteAnualOperacionMantenimiento;
  }
}

interface Raices {
  positiva: number;
  negativa: number;
}

// test
/**
 *
 * @param {number} p Valor Presente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Anualidad
 */
export function aDadoP(p: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return (p * (i * r)) / (r - 1);
}

/**
 *
 * @param {number} g Gradiente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Presente
 */
export function pDadoG(g: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return g * ((1 / i) * ((r - 1) / i - n) * (1 / r));
}

/**
 *
 * @param {number} g Gradiente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Anualidad
 */
export function aDadoG(g: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return g * (1 / i - n / (r - 1));
}
/**
 *
 * @param {number} a Anualidad
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Futuro
 */
export function fDadoA(a: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return (a * (r - 1)) / i;
}

/**
 *
 * @param {number} p Valor Presente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Futuro
 */
export function fDadoP(p: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return p * r;
}
/**
 *
 * @param {number} f Valor Futuro
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Perido
 * @return {number} Valor Presente
 */
export function pDadoF(f: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return f / r;
}

/**
 *
 * @param {number} f Valor Futuro
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Anualidad
 */
export function aDadoF(f: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return (f * i) / (r - 1);
}

/**
 *
 * @param {number} a Anualidad
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Presente
 */
export function pDadoA(a: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return (a * (r - 1)) / (i * r);
}
/**
 * @param {number} g Gradiente
 * @param {number} i Tasa de interés [0%,100%]
 * @param {number} n Periodo
 * @return {number} Valor Futuro
 */
export function fDadoG(g: number, i: number, n: number): number {
  i /= 100;
  const r = (1 + i) ** n;
  return g * ((1 / i) * ((r - 1) / i - n));
}
/**
 *  Para cada ciclo del periodo calcula el Valor Presente
 *  devuelve una lista de objetos con la clave "valor presente"
 *  para visualizarlo mejor en un cosole.table()
 *
 * @param {number[]} y Flujos de fondo
 * @param {number} i Interes
 * @return {ResultadoValorPresente[]} Lista de valores presentes en cada ciclo del periodo.
 */
export function criterioValorPresenteResultados(
  y: number[],
  i: number
): ResultadoValorPresente[] {
  i /= 100;
  const resultados: ResultadoValorPresente[] = [];
  y.reduce((acum: number, ySubT: number, t: number): number => {
    const wSubT: number = acum + ySubT / (1 + i) ** t;
    const res = { 'valor presente': wSubT };
    resultados.push(res);
    return wSubT;
  }, 0);
  return resultados;
}
/**
 *  Devuelve el último resultado de la lista de Valores presentes
 * @param {ResultadoValorPresente[]} resultados Lista de los resultados de valor pres
 * @return {ResultadoValorPresente} Último resultado de la tabla
 */
export function resultadoFinal(
  resultados: ResultadoValorPresente[]
): ResultadoValorPresente {
  return resultados.slice(-1)[0];
}

/**
 *
 * @param {number[]} y
 * @param {number} i
 * @return {ResultadoValorPresente}
 */
export function criteroValorPresente(
  y: number[],
  i: number
): ResultadoValorPresente {
  const resultados: ResultadoValorPresente[] = criterioValorPresenteResultados(
    y,
    i
  );
  console.table(resultados);
  return resultadoFinal(resultados);
}

/**
 * Devuelve el primer flujo en donde se recupere el dinero invertido, es decir,
 * cuando el valor sea 0 o mayor ????
 * TODO: REVISAR ESTO NO CONFIO EN EL ARTURO DEL PASADO!!!😴
 * @param {number[]} y Flujos de fondo del proyecto.
 * @param {number} i Interés
 * @return {number} Ciclo en que se recupera el capital
 */
export function recuperacionCapital(y: number[], i: number): number {
  const resultados: ResultadoValorPresente[] = criterioValorPresenteResultados(
    y,
    i
  );
  const resultadosNum: number[] = resultados.map(
    (resultado) => resultado['valor presentr']
  );
  resultadosNum.reduce((acum: number, numero: number, index: number) => {
    if (acum < numero) {
      acum = numero;
      return index;
    }
  }, 0);
  return 0;
}

/**
 *
 * @param {number[]} y Flujos de fondo del proyecto
 * @param {number} i
 * @return {number}
 */
export function balancesInversion(y: number[], i: number): number[] {
  i /= 100;
  let anterior: number;
  return y.map((fondo: number, index: number) => {
    if (index === 0) {
      anterior = fondo;
      return fondo;
    }
    anterior = anterior * i + anterior + fondo;
    return anterior;
  });
}

/**
 * Implementación de la formula cuadrática
 * Note: Esto esta pal perro
 * @param {number} a [a]x^2+bx+c = 0
 * @param {number} b ax^2+[b]x+c = 0
 * @param {number} c ax^2+bx+[c] = 0
 * @return {Raices} Raices del polinomio.
 */
export function raicesPolinomio2Grado(a: number, b: number, c: number): Raices {
  const raizCuadrada = (b ** 2 - 4 * a * c) ** (1 / 2);
  let raices: Raices;
  raices.positiva = (-1 * b + raizCuadrada) / (2 * a);
  raices.negativa = (-1 * b - raizCuadrada) / (2 * a);
  return raices;
}

/**
 *
 * @param {number} inversionIncial
 * @param {number[]} valoresResiduales
 * @param {number[]} costos
 * @param {number} i Tasa de interés [0%,100%]
 * @return {ResultadoVidaEconomicaOptima}
 */
export function vidaEconomicaOptima(
  inversionIncial: number,
  valoresResiduales: any[],
  costos: any[],
  i: number
): ResultadoVidaEconomicaOptima[] {
  const gradiente = Math.abs(costos[0] - costos[1]);
  // Esto no es una manera muy general que digamos para calcular el gradiente pero es lo que hay lo siento.
  // TODO Hacer un metodo general para detectar gradientes en costos y valores_residuales
  return valoresResiduales.map(
    (valorResidual: number, t: number): ResultadoVidaEconomicaOptima => {
      const año: number = t + 1;
      const resultadoVidaEconomica: ResultadoVidaEconomicaOptima =
        new ResultadoVidaEconomicaOptima();
      const toFixedExpr = `${aDadoP(inversionIncial, i, año).toFixed(2)} + ${
        costos[0]
      } + ${aDadoG(gradiente, i, año).toFixed(2)} - ${aDadoF(
        valorResidual,
        i,
        año
      ).toFixed(2)}`;
      const terminos = toFixedExpr
        .split(' ')
        .filter((element) => element != '+' && element != '-');
      const node = Mathjs.parse(toFixedExpr);
      let operacionMantenimiento = Mathjs.parse(
        `${terminos[1]}+${terminos[2]}`
      ).evaluate();
      operacionMantenimiento = parseFloat(operacionMantenimiento.toFixed(2));
      let resultado = node.evaluate();
      resultado = parseFloat(resultado.toFixed(2));
      resultadoVidaEconomica.costoTotalEquivalente = resultado;
      resultadoVidaEconomica.año = año;
      resultadoVidaEconomica.costoEquivalenteAnualDelActivo = parseFloat(
        (resultado - operacionMantenimiento).toFixed(2)
      );
      resultadoVidaEconomica.costoEquivalenteAnualOperacionMantenimiento =
        operacionMantenimiento;
      resultadoVidaEconomica.latexExpr = `$$A_{${año}} = ${inversionIncial}(A/P,${i}\\%,${año}) + ${
        costos[0]
      } + ${gradiente}(A/G,${i}\\%,${año}) - ${valorResidual}(A/F,${i}\\%,${año}) = ${toFixedExpr} = ${resultado.toFixed(
        2
      )}$$`;
      return resultadoVidaEconomica;
    }
  );
}

/**
 * Recibe una lista de resultados, especificamente, resultados de vida ecoñomica
 * y retorna solo la expresiones de LaTeX
 * TODO: este array debe ser más genrico
 * @param {ResultadoVidaEconomicaOptima[]} resultados
 * @return {string[]}
 */
export function onlyLatex(
  resultados: ResultadoVidaEconomicaOptima[]
): string[] {
  return resultados.map((element: { latexExpr: any }) => element.latexExpr);
}

/**
 * Copia un arreglo en el portapapeles en texto plano
 * Cambia las comas (,)  de los decimales por puntos (.) 9,3 -> 9.3
 * @param {any[]} array Arreglo de expresiones de LaTeX
 */
export function clipboardArray(array: any[]): void {
  const stringToCopy = array.reduce((acum: any, element: any) => {
    return acum + element + '\n\n';
  }, '');
  clipboardy.writeSync(
    stringToCopy.replace(/\./g, ',').replace(/(\d+)(\d{3})/g, '$1' + '.' + '$2')
  );
  console.log('¡Se ha copiado con exito!');
}
/**
 * Copia en formato de google sheets los resultados
 * TODO: Encontrar una manera más genrica, que no solo parsee Resultados de vida
 * economica.
 * @param {ResultadoVidaEconomicaOptima[]}array
 */
export function clipboardTable(array: ResultadoVidaEconomicaOptima[]): void {
  const stringToCopy = array.reduce(
    (acum: string, element: ResultadoVidaEconomicaOptima): string => {
      return (
        acum +
        `${element.año}\t${element.costoEquivalenteAnualDelActivo}\t${element.costoEquivalenteAnualOperacionMantenimiento}\t${element.costoTotalEquivalente}\n`
      );
    },
    // Titulos de la tabla, estar pendiente a la hora de hacerlo más generico
    'Año\tCosto Equivalente Anual del Activo\tCosto Equivalente Anual Operacion y Mantenimiento\tCosto Total Equivalente\n'
  );
  clipboardy.writeSync(
    stringToCopy.replace(/\./g, ',').replace(/(\d+)(\d{3})/g, '$1' + '.' + '$2')
  );
  // clipboardy.writeSync(stringToCopy);
  console.log('¡Se ha copiado con exito!');
}

/**
 *  Expande los valores hasta que el arreglo de valores llegue
 * @param {number} valores
 * @param {number} costos
 * @return {Array<Array<number>>} costos = [0] y valores = [1]
 */
export function expandValues(
  valores: number[],
  costos: number[]
): Array<Array<number>> {
  const gradienteValores = Math.abs(valores[0] - valores[1]);
  const gradienteCostos = Math.abs(costos[0] - costos[1]);
  console.log(gradienteValores);
  console.log(gradienteCostos);
  while (valores.slice(-1)[0] > 0) {
    valores.push(valores.slice(-1)[0] - gradienteValores);
    costos.push(costos.slice(-1)[0] + gradienteCostos);
  }
  return [valores, costos];
}

/**
 * Entry-point
 */
function main() {
  console.log('Ing_economica on TS   v1.0.0');
}

main();
