/**
 * @module main
 * Programa principal para el ejercicio-2. Se leen argumentos desde process.argv y se ejecuta la función de conteo de logs.
 */

import chalk from "chalk";
import { contarOcurrenciasLog, PalabraClaveLog } from "./leerLogs.js";

/**
 * Obtener argumentos desde `process.argv`. Se esperan 2 argumentos adicionales:
 *  - El primer argumento es la ruta del archivo de logs.
 *  - El segundo argumento es la palabra clave a buscar ("ERROR", "WARNING" o "INFO").
 *
 * @remarks
 *  process.argv[0] → ruta de 'node'
 *  process.argv[1] → ruta del script
 *  process.argv[2] → rutaArchivo
 *  process.argv[3] → palabraClave
 *
 * @example
 * ```bash
 * npm start ./src/ejercicio-2/logs.txt ERROR
 * npm start ./src/ejercicio-2/logs.txt INFO
 * npm start ./src/ejercicio-2/logs.txt WARNING
 * ```
 */
const rutaArchivo: string | undefined = process.argv[2];
const claveArg: string | undefined = process.argv[3];

/**
 * Verificar que se hayan pasado los argumentos necesarios.
 * Si faltan, se muestra un mensaje de ayuda y se detiene la ejecución.
 * @returns void
 */
if (!rutaArchivo || !claveArg) {
  console.log(chalk.yellow("Uso: npm start <rutaLogs> <ERROR|WARNING|INFO>"));
  process.exit(0);
}

/**
 * Convertir la clave a mayúsculas y forzar el tipo `PalabraClaveLog`.
 * Luego, verificar si es válida.
 * Si no es válida, se muestra un mensaje de error y se detiene la ejecución.
 */
const palabraClave = claveArg.toUpperCase() as PalabraClaveLog;
const palabrasValidas = new Set(["ERROR", "WARNING", "INFO"]);
if (!palabrasValidas.has(palabraClave)) {
  console.log(
    chalk.red("La palabra clave no es válida (use ERROR, WARNING o INFO)."),
  );
  process.exit(1);
}

/**
 * Llamar a la función de conteo de ocurrencias, pasando un callback para manejar el resultado.
 */
contarOcurrenciasLog(rutaArchivo, palabraClave, (resultado) => {
  if (resultado === undefined) {
    console.log(
      chalk.red("No se pudo contar ocurrencias o el archivo está vacío."),
    );
  } else {
    console.log(chalk.green(`Ocurrencias de "${palabraClave}": ${resultado}`));
  }
});
