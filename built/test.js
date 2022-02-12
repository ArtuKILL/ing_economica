"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ing_economica_1 = require("./ing_economica");
// eslint-disable-next-line require-jsdoc
function main() {
    //   const valores = [12000, 12000, 12000];
    //   const costos = [35000, 35000, 35000];
    var valores = [3600, 3200, 2800, 2400, 2000, 1600, 1200];
    var costos = [1000, 1100, 1200, 1300, 1400, 1500, 1600];
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
    var a = (0, ing_economica_1.vidaEconomicaOptima)(6000, valores, costos, 15);
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
    (0, ing_economica_1.clipboardArray)((0, ing_economica_1.onlyLatex)(a));
    //   clipboardTable(a);
    //   console.log(vidaEconomicaOptima(6000, valores, costos, 15));
}
main();
