/**
 * @module leerLogs
 * Contar las ocurrencias de palabras clave ("ERROR", "WARNING", "INFO") en un archivo de logs.
 * Se usan funciones asíncronas o Callbacks API.
 */

import { readFile } from "fs"; // Es una función asíncrona que lee un archivo y retorna su contenido.
import type { Buffer } from "buffer"; // Es un tipo que representa un buffer de datos.

/**
 * Tipo de palabra clave para logs. Puede ser "ERROR", "WARNING" o "INFO".
 */
export type PalabraClaveLog = "ERROR" | "WARNING" | "INFO";

/**
 * Lee el archivo de logs y cuenta la cantidad de ocurrencias de la palabra clave indicada.
 * @param rutaArchivo - Ruta del archivo de logs.
 * @param clave -  Palabra clave a buscar.
 * @param callback - Función callback que recibe el número de ocurrencias o `undefined` en caso de error/archivo vacío.
 * @returns void
 */
export function contarOcurrenciasLog(
  rutaArchivo: string,
  clave: PalabraClaveLog,
  callback: (resultado: number | undefined) => void,
): void {
  /**
   * Leer archivo de logs y contar ocurrencias de la palabra clave asíncrono).
   * Se usa `Buffer` para manejar datos binarios y codificación por defecto.
   * @param rutaArchivo - Ruta del archivo de logs.
   * @param error - Error de lectura.
   * @param datos - Datos del archivo.
   * @returns void
   */
  readFile(rutaArchivo, (error, datos: Buffer) => {
    // Si hay error, retornar `undefined`
    if (error) {
      return callback(undefined);
    }
    // Convertir datos a string
    const contenido = datos.toString();
    // Si el contenido está vacío, retornar `undefined`
    if (contenido.length === 0) {
      return callback(undefined);
    }
    let conteo = 0;
    // Separar contenido por lineas y eliminar espacios
    const lineas = contenido.split("\n");
    // Recorrer lineas
    lineas.forEach((linea) => {
      const palabras = linea.split(/\s+/);
      // Recorrer palabras de la linea y contar ocurrencias
      palabras.forEach((palabra) => {
        if (palabra === clave) {
          conteo++;
        }
      });
    });
    // Retornar conteo de ocurrencias
    return callback(conteo);
  });
}
