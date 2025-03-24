/**
 * @module main
 * # main
 * @remarks
 * Programa principal que se ejecuta desde la línea de comandos para convertir
 * datos meteorológicos JSON a CSV, leyendo argumentos de `process.argv`.
 */

import chalk from "chalk";
import { convertirMeteoJSONaCSV } from "./convertirMeteo.js";

/**
 * Obtener argumentos desde `process.argv`. Se esperan 2 argumentos adicionales:
 *  - El primer argumento es la ruta del archivo JSON de entrada.
 *  - El segundo argumento es la ruta del archivo CSV de salida.
 * Si no se reciben los argumentos esperados, se muestra un mensaje de uso y se sale.
 * Si se reciben los argumentos esperados, se llama a la función de conversión.
 *
 * @remarks
 * process.argv[0] -\> ruta de 'node'
 * process.argv[1] -\> ruta del script
 * process.argv[2] -\> rutaEntrada JSON
 * process.argv[3] -\> rutaSalida CSV
 *
 * @example
 * ```bash
 * npm start ./src/ejercicio-2/meteo.json ./src/ejercicio-2/meteo.csv
 * ```
 */

const rutaEntrada: string | undefined = process.argv[2];
const rutaSalida: string | undefined = process.argv[3];

/**
 * Validar parámetros. Si faltan, mostrar un uso genérico y salir.
 * Se usan los colores de `chalk` para mayor claridad.
 */
if (!rutaEntrada || !rutaSalida) {
  console.log(
    chalk.yellow("Uso: npm start <ficheroEntrada.json> <ficheroSalida.csv>"),
  );
  process.exit(0);
}

/**
 * Llamar a la función de conversión. Manejar el resultado en la callback.
 * Se usan los colores de `chalk` para mayor claridad.
 * @param rutaEntrada - Ruta del fichero JSON de entrada.
 * @param rutaSalida - Ruta del fichero CSV de salida.
 * @param resultado - `true` si la conversión fue exitosa, `undefined` si hubo un error.
 */
convertirMeteoJSONaCSV(rutaEntrada, rutaSalida, (resultado) => {
  if (resultado === undefined) {
    console.log(
      chalk.red(
        "No se pudo convertir el fichero. Archivo vacío o error de lectura/escritura.",
      ),
    );
  } else {
    console.log(chalk.green("Conversión a CSV realizada con éxito."));
  }
});
