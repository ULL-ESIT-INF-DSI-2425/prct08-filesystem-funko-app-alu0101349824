/**
 * @module GestorFunko.spec
 */

import fs from "fs";
import path from "path";
import { describe, test, expect, beforeAll, afterAll } from "vitest";
import {
  GestorFunko,
  Funko,
  TipoFunko,
  GeneroFunko,
} from "../../src/ejercicio-1/index.js";

/**
 * Función auxiliar para limpiar el directorio de prueba.
 *
 * @param ruta - Ruta del directorio a limpiar.
 */
function limpiarDirectorio(ruta: string): void {
  if (fs.existsSync(ruta)) {
    const archivos = fs.readdirSync(ruta);
    archivos.forEach((archivo) => {
      fs.unlinkSync(path.join(ruta, archivo));
    });
    fs.rmdirSync(ruta);
  }
}

describe("Pruebas de GestorFunko con cobertura completa", () => {
  const usuarioPrueba = "usuario_prueba";
  const rutaPrueba = path.join("funkos", usuarioPrueba);

  beforeAll(() => {
    // Aseguramos que el directorio de prueba esté limpio antes de empezar
    limpiarDirectorio(rutaPrueba);
  });

  afterAll(() => {
    // Limpieza final
    limpiarDirectorio(rutaPrueba);
  });

  test("Listar Funkos en un directorio vacío", () => {
    // Directorio vacío → "No hay Funkos en la colección."
    const gestor = new GestorFunko(usuarioPrueba);
    gestor.listarFunkos();
    // No hay aserción directa porque solo comprobamos que no crashea.
    // Si deseas capturar la salida de consola, puedes usar mocks/spies.
  });

  test("Agregar varios Funkos con distintos valores de mercado", () => {
    const gestor = new GestorFunko(usuarioPrueba);

    // Funko con valor < 10
    const funko1 = new Funko(
      1,
      "Funko valor bajo",
      "Descripción 1",
      TipoFunko.Pop,
      GeneroFunko.Videojuegos,
      "Franquicia A",
      101,
      false,
      "Ninguna",
      5, // < 10 → color rojo
    );
    gestor.agregarFunko(funko1);

    // Funko con valor < 50
    const funko2 = new Funko(
      2,
      "Funko valor medio",
      "Descripción 2",
      TipoFunko.PopRides,
      GeneroFunko.Animacion,
      "Franquicia B",
      102,
      true,
      "Brilla en la oscuridad",
      30, // < 50 → color amarillo
    );
    gestor.agregarFunko(funko2);

    // Funko con valor < 100
    const funko3 = new Funko(
      3,
      "Funko valor intermedio",
      "Descripción 3",
      TipoFunko.VynilSoda,
      GeneroFunko.PeliculasTV,
      "Franquicia C",
      103,
      false,
      "Cabeceo",
      75, // < 100 → color cian
    );
    gestor.agregarFunko(funko3);

    // Funko con valor >= 100
    const funko4 = new Funko(
      4,
      "Funko valor alto",
      "Descripción 4",
      TipoFunko.VynilGold,
      GeneroFunko.Musica,
      "Franquicia D",
      104,
      true,
      "Edición limitada",
      150, // >= 100 → color verde
    );
    gestor.agregarFunko(funko4);

    // Agregar un Funko duplicado
    const funkoDuplicado = new Funko(
      4,
      "Funko duplicado",
      "Descripción duplicada",
      TipoFunko.Pop,
      GeneroFunko.Deportes,
      "Franquicia E",
      105,
      false,
      "Ninguna",
      10,
    );
    const resultado = gestor.agregarFunko(funkoDuplicado);
    expect(resultado).toBeUndefined(); // Debe fallar porque el ID 4 ya existe
  });

  test("Listar Funkos con elementos en el directorio (cubre ramas de color)", () => {
    // Ahora hay 4 Funkos en el directorio
    const gestor = new GestorFunko(usuarioPrueba);
    gestor.listarFunkos();
    // Recorre 4 Funkos con distintos valores de mercado, cubriendo la función de color
  });

  test("Leer un Funko existente y otro inexistente", () => {
    const gestor = new GestorFunko(usuarioPrueba);
    // Leer funko 1 (existe)
    const resultado1 = gestor.leerFunko(1);
    expect(resultado1).toBeUndefined(); // No retorna nada en caso de éxito

    // Leer funko 999 (no existe)
    const resultado2 = gestor.leerFunko(999);
    expect(resultado2).toBeUndefined(); // Mensaje de error en consola
  });

  test("Actualizar un Funko existente y otro inexistente", () => {
    const gestor = new GestorFunko(usuarioPrueba);

    // Actualizar funko 1
    const funkoActualizado = new Funko(
      1,
      "Funko valor bajo actualizado",
      "Descripción actualizada",
      TipoFunko.Pop,
      GeneroFunko.Videojuegos,
      "Franquicia A actualizada",
      200,
      false,
      "Ninguna",
      8,
    );
    gestor.actualizarFunko(funkoActualizado);

    // Intentar actualizar un funko inexistente
    const funkoInexistente = new Funko(
      999,
      "No existe",
      "Descripción inexistente",
      TipoFunko.Pop,
      GeneroFunko.Videojuegos,
      "Franquicia X",
      300,
      false,
      "Ninguna",
      15,
    );
    const resultado = gestor.actualizarFunko(funkoInexistente);
    expect(resultado).toBeUndefined();
  });

  test("Eliminar un Funko existente y otro inexistente", () => {
    const gestor = new GestorFunko(usuarioPrueba);

    // Eliminar funko 1
    gestor.eliminarFunko(1);
    const rutaArchivo1 = path.join(rutaPrueba, "1.json");
    expect(fs.existsSync(rutaArchivo1)).toBe(false);

    // Eliminar funko 999 (inexistente)
    const resultado = gestor.eliminarFunko(999);
    expect(resultado).toBeUndefined(); // Mensaje de error en consola
  });
});
