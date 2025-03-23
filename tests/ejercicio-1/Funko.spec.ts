/**
 * @module Funko.spec
 */
import { describe, test, expect } from "vitest";
import { Funko, TipoFunko, GeneroFunko } from "../../src/ejercicio-1/index.js";

describe("Pruebas de la clase Funko", () => {
  test("Creación de un Funko con valores correctos", () => {
    const funko = new Funko(
      1,
      "Sonic",
      "El erizo azul",
      TipoFunko.Pop,
      GeneroFunko.Videojuegos,
      "Sonic the Hedgehog",
      1,
      false,
      "Cabeceo",
      15,
    );

    expect(funko.id).toBe(1);
    expect(funko.nombre).toBe("Sonic");
    expect(funko.descripcion).toBe("El erizo azul");
    expect(funko.tipo).toBe(TipoFunko.Pop);
    expect(funko.genero).toBe(GeneroFunko.Videojuegos);
    expect(funko.franquicia).toBe("Sonic the Hedgehog");
    expect(funko.numero).toBe(1);
    expect(funko.exclusivo).toBe(false);
    expect(funko.caracteristicasEspeciales).toBe("Cabeceo");
    expect(funko.valorMercado).toBe(15);
  });

  test("Creación de un Funko con otro tipo y género", () => {
    const funko = new Funko(
      2,
      "Iron Man",
      "Figura metálica",
      TipoFunko.VynilGold,
      GeneroFunko.PeliculasTV,
      "Marvel",
      450,
      true,
      "Brilla en la oscuridad",
      120,
    );

    expect(funko.id).toBe(2);
    expect(funko.tipo).toBe(TipoFunko.VynilGold);
    expect(funko.genero).toBe(GeneroFunko.PeliculasTV);
    expect(funko.valorMercado).toBe(120);
  });
});
