/**
 * @module Funko
 */

/**
 * Enumeración de tipos de Funko.
 *
 * @remarks
 * Valores permitidos: Pop!, Pop! Rides, Vynil Soda, Vynil Gold.
 */
export enum TipoFunko {
  Pop = "Pop!",
  PopRides = "Pop! Rides",
  VynilSoda = "Vynil Soda",
  VynilGold = "Vynil Gold",
}

/**
 * Enumeración de géneros de Funko.
 *
 * @remarks
 * Valores permitidos: Animación, Películas y TV, Videojuegos, Deportes, Música, Ánime.
 */
export enum GeneroFunko {
  Animacion = "Animación",
  PeliculasTV = "Películas y TV",
  Videojuegos = "Videojuegos",
  Deportes = "Deportes",
  Musica = "Música",
  Anime = "Ánime",
}

/**
 * Clase que representa un Funko.
 *
 * @remarks
 * Cada Funko contiene información esencial como: identificador único, nombre, descripción, tipo, género, franquicia, número, exclusividad, características especiales y valor de mercado.
 */
export class Funko {
  /**
   * Crea una instancia de Funko.
   *
   * @param id - Identificador único del Funko.
   * @param nombre - Nombre del Funko.
   * @param descripcion - Descripción del Funko.
   * @param tipo - Tipo de Funko (ver {@link TipoFunko}).
   * @param genero - Género del Funko (ver {@link GeneroFunko}).
   * @param franquicia - Franquicia a la que pertenece.
   * @param numero - Número identificativo dentro de la franquicia.
   * @param exclusivo - Indica si es exclusivo.
   * @param caracteristicasEspeciales - Características especiales del Funko.
   * @param valorMercado - Valor de mercado del Funko.
   */
  constructor(
    public id: number,
    public nombre: string,
    public descripcion: string,
    public tipo: TipoFunko,
    public genero: GeneroFunko,
    public franquicia: string,
    public numero: number,
    public exclusivo: boolean,
    public caracteristicasEspeciales: string,
    public valorMercado: number,
  ) {}
}
