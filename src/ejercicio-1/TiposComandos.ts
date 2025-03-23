/**
 * @module TiposComandos
 */

/**
 * Argumentos comunes para comandos que requieren el nombre de usuario.
 */
export interface ArgsUsuario {
  usuario: string;
}

/**
 * Argumentos comunes para comandos que requieren usuario e id.
 */
export interface ArgsUsuarioId extends ArgsUsuario {
  id: number;
}

/**
 * Argumentos para comandos de agregar o actualizar un Funko.
 */
export interface ArgsFunko extends ArgsUsuarioId {
  nombre: string;
  descripcion: string;
  tipo: string; // Luego se convertirá a TipoFunko
  genero: string; // Luego se convertirá a GeneroFunko
  franquicia: string;
  numero: number;
  exclusivo: boolean;
  caracteristicas: string;
  valor: number;
}
