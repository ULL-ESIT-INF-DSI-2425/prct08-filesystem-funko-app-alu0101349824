/**
 * @module convertirMeteo
 * # convertirMeteo
 * @remarks
 * Módulo que lee un archivo JSON con datos meteorológicos, lo convierte a CSV y lo
 * escribe en la ruta de salida indicada. Usa la API de fs por callbacks.
 *
 * - Si se produce un error (archivo inexistente, vacío, formato JSON inválido, etc.)
 *   se retorna `undefined`.
 * - La cabecera del CSV se extrae directamente de las propiedades existentes en el JSON.
 */

import { readFile, writeFile } from "fs";
import type { Buffer } from "buffer";

/**
 * ## convertirMeteoJSONaCSV
 * Lee un archivo JSON (un array de objetos con propiedades arbitrarias) y lo convierte a CSV,
 * generando la cabecera del CSV a partir de las claves encontradas en los objetos JSON.
 *
 * @param rutaEntrada - Ruta del fichero JSON de entrada.
 * @param rutaSalida - Ruta del fichero CSV de salida.
 * @param callback - Recibe `true` si el proceso finaliza correctamente, o `undefined` si hay error.
 * @returns void
 */
export function convertirMeteoJSONaCSV(
  rutaEntrada: string,
  rutaSalida: string,
  callback: (resultado: boolean | undefined) => void,
): void {
  readFile(rutaEntrada, (errorLectura, buffer: Buffer) => {
    // 1. Manejar error de lectura (archivo inexistente, permisos, etc.)
    if (errorLectura) {
      return callback(undefined);
    }

    // 2. Manejar archivo vacío
    const contenido = buffer.toString();
    if (contenido.length === 0) {
      return callback(undefined);
    }

    // 3. Parsear el JSON (manejo de excepción con try/catch)
    let datos: Array<Record<string, unknown>>; // Array de objetos con propiedades arbitrarias
    try {
      // Intentar parsear el JSON a un array de objetos
      datos = JSON.parse(contenido);
    } catch {
      // Si falla el parseo, retornar `undefined`
      return callback(undefined);
    }

    // 4. Verificar que haya algún elemento en el array
    if (datos.length === 0) {
      return callback(undefined);
    }

    /**
     * 5. Recopilar todas las claves (propiedades) que aparezcan en cualquiera de los objetos.
     *    Esto hace que la cabecera sea dinámica. Se usará un Set para evitar duplicados.
     *    Se convierte el Set en un array para poder iterar sobre él.
     */
    const cabeceraSet = new Set<string>();
    datos.forEach((obj) => {
      // Object.keys() devuelve un array con las claves de un objeto.
      Object.keys(obj).forEach((k) => {
        // Agregar la clave al set
        cabeceraSet.add(k);
      });
    });
    const cabeceraArray = Array.from(cabeceraSet); // Convertimos el set en array

    // Generar la cabecera (unidas por comas)
    let csv = cabeceraArray.join(",") + "\n";

    /**
     * 6. Recorrer el array de datos para generar cada fila:
     *    - Por cada objeto, se toma el valor de cada clave en `cabeceraArray`.
     *    - Si la clave no está presente en el objeto, se pone vacío.
     */
    datos.forEach((obj) => {
      // Para cada clave, si existe en el objeto se usa su valor, en caso contrario comillas vacías
      const colValor = cabeceraArray.map((k) =>
        obj[k] !== undefined ? obj[k] : "",
      );
      // Unir los valores de la fila con comas y añadir un salto de línea
      csv += colValor.join(",") + "\n";
    });

    // 7. Escribir el CSV en la ruta de salida
    writeFile(rutaSalida, csv, (errorEscritura) => {
      // Si hay error de escritura, retornar `undefined`
      if (errorEscritura) {
        return callback(undefined);
      }
      // Si no, retornar `true`
      return callback(true);
    });
  });
}
