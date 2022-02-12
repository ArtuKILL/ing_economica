import {
  vidaEconomicaOptima,
  clipboardArray,
  onlyLatex,
  //   clipboardTable,
  ResultadoVidaEconomicaOptima,
} from './ing_economica';

// eslint-disable-next-line require-jsdoc
function main() {
  //   const valores = [12000, 12000, 12000];
  //   const costos = [35000, 35000, 35000];
  const valores = [3_600, 3_200, 2_800, 2_400, 2_000, 1_600, 1_200];
  const costos = [1_000, 1_100, 1_200, 1_300, 1_400, 1_500, 1_600];
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
  const a: ResultadoVidaEconomicaOptima[] = vidaEconomicaOptima(
    6000,
    valores,
    costos,
    15
  );
  //   const tablaResultados = a.map((e: ResultadoVidaEconomicaOptima) => {
  //     return {
  //       año: e.,
  //       CostoEquivalenteAnualDelActivo: e['CostoEquivalenteAnualDelActivo'],
  //       CostoEquivalenteAnualOperacionMantenimiento:
  //         e['CostoEquivalenteAnualOperacionMantenimiento'],
  //       costoEquivalente: e['CostoTotalEquivalente'],
  //     };
  //   });
  console.table(a);
  clipboardArray(onlyLatex(a));
  //   clipboardTable(a);
  //   console.log(vidaEconomicaOptima(6000, valores, costos, 15));
}

main();
