const Mathjs = require('mathjs');
const clipboardy = require('clipboardy');
// const { evaluate } = require("mathjs");
let round = Math.round;

//test

function a_dado_p(p, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return (p * (i * r)) / (r - 1);
}

function p_dado_g(g, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return g * ((1 / i) * ((r - 1) / i - n) * (1 / r));
}

function a_dado_g(g, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return g * (1 / i - n / (r - 1));
}

function f_dado_a(a, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return (a * (r - 1)) / i;
}

//Costo postpagable
function f_dado_p(p, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return p * r;
}

function p_dado_f(f, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return f / r;
}

function a_dado_f(f, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return (f * i) / (r - 1);
}

function p_dado_a(a, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return (a * (r - 1)) / (i * r);
}

function f_dado_g(g, i, n) {
  i /= 100;
  let r = (1 + i) ** n;
  return g * ((1 / i) * ((r - 1) / i - n));
}

function aux(i, p, g, a) {
  c1 =
    p * (1 + i) ** 12 +
    (g / i) * (((1 + i) ** 12 - 1) / i - 12) +
    (a * ((1 + i) ** 12 - 1)) / i;
  i = 0.03;
  return (
    c1 * (1 + i) ** 12 +
    (g / i) * (((1 + i) ** 12 - 1) / i - 12) +
    (a * ((1 + i) ** 12 - 1)) / i
  );
}

function criterio_valor_presente_resultados(y, i) {
  i /= 100;
  resultados = [];
  let w = y.reduce((acum, y_t, t) => {
    let w_t = acum + y_t / (1 + i) ** t;
    res = { 'valor presente': w_t };
    resultados.push(res);
    return w_t;
  }, 0);
  return resultados;
}

function resultado_final(resultados) {
  return resultados.slice(-1)[0];
}

function criterio_valor_presente(y, i) {
  resultados = criterio_valor_presente_resultados(y, i);
  console.table(resultados);
  return resultado_final(resultados);
}

function recuperacion_capital(y, i) {
  let resultados = criterio_valor_presente_resultados(y, i);
  resultados.reduce((acum, numero, index) => {
    if (acum < numero) {
      acum = numero;
      return index;
    }
  }, 0);
}

function balances_inversion(y, i) {
  i /= 100;
  return y.map((fondo, index) => {
    if (index === 0) {
      var anterior = fondo;
      return fondo;
    }
    anterior = anterior * i + anterior + fondo;
    return anterior;
  });
}

function raices_polinomio_2_grado(a, b, c) {
  let raizCuadrada = (b ** 2 - 4 * a * c) ** (1 / 2);
  let positivo = (-1 * b + raizCuadrada) / (2 * a);
  let negativo = (-1 * b - raizCuadrada) / (2 * a);
  return { positivo: positivo, negativo: negativo };
}

function vida_economica_optima(
  inversion_incial,
  valores_residuales,
  costos,
  i
) {
  let gradiente = Math.abs(costos[0] - costos[1]); //Esto no es una manera muy general que digamos para calcular el gradiente pero es lo que hay lo siento.
  // TODO Hacer un metodo general para detectar gradientes en costos y valores_residuales
  return valores_residuales.map((valor_residual, t) => {
    año = t + 1;
    let toFixedExpr = `${a_dado_p(inversion_incial, i, año).toFixed(2)} + ${
      costos[0]
    } + ${a_dado_g(gradiente, i, año).toFixed(2)} - ${a_dado_f(
      valor_residual,
      i,
      año
    ).toFixed(2)}`;
    let terminos = toFixedExpr
      .split(' ')
      .filter((element) => element != '+' && element != '-');
    let node = Mathjs.parse(toFixedExpr);
    let operacionMantenimiento = Mathjs.parse(
      `${terminos[1]}+${terminos[2]}`
    ).evaluate();
    operacionMantenimiento = parseFloat(operacionMantenimiento.toFixed(2));
    let resultado = node.evaluate();
    resultado = parseFloat(resultado.toFixed(2));
    return {
      año: año,
      CostoTotalEquivalente: resultado,
      CostoEquivalenteAnualDelActivo: parseFloat(
        (resultado - operacionMantenimiento).toFixed(2)
      ),
      CostoEquivalenteAnualOperacionMantenimiento: operacionMantenimiento,
      latexExpr: `$$A_{${año}} = ${inversion_incial}(A/P,${i}%,${año}) + ${
        costos[0]
      } + ${gradiente}(A/G,${i}%,${año}) - ${valor_residual}(A/F,${i}%,${año}) = ${toFixedExpr} = ${resultado.toFixed(
        2
      )}$$`,
    };
  });
}

function onlyLatex(array) {
  return array.map((element) => element.latexExpr);
}

function ClipboardArray(array) {
  let stringToCopy = array.reduce((acum, element) => {
    return acum + element + '\n\n';
  }, '');
  clipboardy.writeSync(
    stringToCopy.replace(/\./g, ',').replace(/(\d+)(\d{3})/g, '$1' + '.' + '$2')
  );
  console.log('¡Se ha copiado con exito!');
}

// Copia en formato de google sheets los resultados
function ClipboardTable(array) {
  let stringToCopy = array.reduce((acum, element) => {
    return (
      acum +
      `${element.año}\t${element.CostoEquivalenteAnualDelActivo}\t${element.CostoEquivalenteAnualOperacionMantenimiento}\t${element.CostoTotalEquivalente}\n`
    );
  }, 'Año\tCosto Equivalente Anual del Activo\tCosto Equivalente Anual Operacion y Mantenimiento\tCosto Total Equivalente\n');
  clipboardy.writeSync(
    stringToCopy.replace(/\./g, ',').replace(/(\d+)(\d{3})/g, '$1' + '.' + '$2')
  );
  // clipboardy.writeSync(stringToCopy);
  console.log('¡Se ha copiado con exito!');
}

//Expande los valores hasta que el arreglo de valores llegue
function expand_values(valores, costos) {
  let gradiente_valores = Math.abs(valores[0] - valores[1]);
  let gradiente_costos = Math.abs(costos[0] - costos[1]);
  console.log(gradiente_valores);
  console.log(gradiente_costos);
  while (valores.slice(-1)[0] > 0) {
    valores.push(valores.slice(-1)[0] - gradiente_valores);
    costos.push(costos.slice(-1)[0] + gradiente_costos);
  }
  return [valores, costos];
}

function test() {
  let valores = [12_000, 12_000, 12_000];
  let costos = [35_000, 35_000, 35_000];
  // let valores = [3_600, 3_200, 2_800, 2_400, 2_000, 1_600, 1_200];
  // let costos = [1_000, 1_100, 1_200, 1_300, 1_400, 1_500, 1_600];
  //   let valores = [80_000, 60_000, 40_000, 20_000, 0];
  //   let costos = [10_000, 30_000, 50_000, 70_000, 90_000];
  //   let valores = [
  //     18_000, 16_000, 14_000, 12_000, 10_000, 8_000, 6_000, 4_000, 2_000, 0,
  //   ];
  //   let costos = [
  //     1_100, 2_200, 3_300, 4_000, 5_500, 6_600, 7_700, 8_800, 9_900, 11_000,
  //   ];
  //   new_values = expand_values(valores, costos);
  //   console.log(new_values);
  //   valores = new_values[0];
  //   costos = new_values[1];

  let a = vida_economica_optima(6_000, valores, costos, 15);
  tablaResultados = a.map((e) => {
    return {
      año: e['año'],
      CostoEquivalenteAnualDelActivo: e['CostoEquivalenteAnualDelActivo'],
      CostoEquivalenteAnualOperacionMantenimiento:
        e['CostoEquivalenteAnualOperacionMantenimiento'],
      costoEquivalente: e['CostoTotalEquivalente'],
    };
  });
  console.table(tablaResultados);
  ClipboardArray(onlyLatex(a));
  ClipboardTable(a);
}

function main() {}

module.exports = {
  ADadoP: a_dado_p,
  ADadoG: a_dado_g,
  ADadoF: a_dado_f,
  FDadoA: f_dado_a,
  FDadoP: f_dado_p,
  FDadoG: f_dado_g,
  PDadoA: p_dado_a,
  PDadoF: p_dado_f,
  PDadoG: p_dado_g,
  ValorPresente: criterio_valor_presente,
  Balance: balances_inversion,
  RaicesPolinomio2Grado: raices_polinomio_2_grado,
  VidaEconomicaOptima: vida_economica_optima,
  T: test,
  Recuperacion: recuperacion_capital,
  ClipboardTable: ClipboardTable,
};

main();
