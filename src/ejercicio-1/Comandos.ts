/**
 * @module Comandos
 * Configura la CLI usando yargs y ejecuta la aplicación.
 * @remarks
 * La aplicación permite agregar, actualizar, eliminar, listar y leer Funkos de una colección mediante comandos.
 * Cada Funko se guarda en un fichero JSON independiente. La colección se organiza por usuario.
 * Los comandos disponibles son:
 *  - `agregar`: Agrega un nuevo Funko a la colección.
 *  - `actualizar`: Actualiza un Funko existente en la colección.ag
 *  - `eliminar`: Elimina un Funko de la colección.
 *  - `listar`: Lista todos los Funkos de la colección.
 *  - `leer`: Muestra la información de un Funko específico.
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { GestorFunko } from "./GestorFunko.js";
import { Funko, TipoFunko, GeneroFunko } from "./Funko.js";
import { ArgsFunko, ArgsUsuario, ArgsUsuarioId } from "./TiposComandos.js";

void yargs(hideBin(process.argv))
  // Comando para agregar un Funko
  .command<ArgsFunko>(
    "agregar",
    "Agrega un nuevo Funko a la colección.",
    (yargs) =>
      yargs.options({
        usuario: {
          type: "string",
          demandOption: true,
          describe: "Nombre del usuario",
        },
        id: {
          type: "number",
          demandOption: true,
          describe: "Identificador del Funko",
        },
        nombre: {
          type: "string",
          demandOption: true,
          describe: "Nombre del Funko",
        },
        descripcion: {
          type: "string",
          demandOption: true,
          describe: "Descripción del Funko",
        },
        tipo: {
          type: "string",
          demandOption: true,
          describe: "Tipo del Funko",
        },
        genero: {
          type: "string",
          demandOption: true,
          describe: "Género del Funko",
        },
        franquicia: {
          type: "string",
          demandOption: true,
          describe: "Franquicia del Funko",
        },
        numero: {
          type: "number",
          demandOption: true,
          describe: "Número identificativo",
        },
        exclusivo: {
          type: "boolean",
          demandOption: true,
          describe: "Indica si es exclusivo",
        },
        caracteristicas: {
          type: "string",
          demandOption: true,
          describe: "Características especiales",
        },
        valor: {
          type: "number",
          demandOption: true,
          describe: "Valor de mercado",
        },
      }),
    (args) => {
      const gestor = new GestorFunko(args.usuario);
      const nuevoFunko = new Funko(
        args.id,
        args.nombre,
        args.descripcion,
        args.tipo as TipoFunko,
        args.genero as GeneroFunko,
        args.franquicia,
        args.numero,
        args.exclusivo,
        args.caracteristicas,
        args.valor,
      );
      gestor.agregarFunko(nuevoFunko);
    },
  )
  // Comando para actualizar un Funko
  .command<ArgsFunko>(
    "actualizar",
    "Actualiza un Funko existente en la colección.",
    (yargs) =>
      yargs.options({
        usuario: {
          type: "string",
          demandOption: true,
          describe: "Nombre del usuario",
        },
        id: {
          type: "number",
          demandOption: true,
          describe: "Identificador del Funko",
        },
        nombre: {
          type: "string",
          demandOption: true,
          describe: "Nombre del Funko",
        },
        descripcion: {
          type: "string",
          demandOption: true,
          describe: "Descripción del Funko",
        },
        tipo: {
          type: "string",
          demandOption: true,
          describe: "Tipo del Funko",
        },
        genero: {
          type: "string",
          demandOption: true,
          describe: "Género del Funko",
        },
        franquicia: {
          type: "string",
          demandOption: true,
          describe: "Franquicia del Funko",
        },
        numero: {
          type: "number",
          demandOption: true,
          describe: "Número identificativo",
        },
        exclusivo: {
          type: "boolean",
          demandOption: true,
          describe: "Indica si es exclusivo",
        },
        caracteristicas: {
          type: "string",
          demandOption: true,
          describe: "Características especiales",
        },
        valor: {
          type: "number",
          demandOption: true,
          describe: "Valor de mercado",
        },
      }),
    (args) => {
      const gestor = new GestorFunko(args.usuario);
      const funkoActualizado = new Funko(
        args.id,
        args.nombre,
        args.descripcion,
        args.tipo as TipoFunko,
        args.genero as GeneroFunko,
        args.franquicia,
        args.numero,
        args.exclusivo,
        args.caracteristicas,
        args.valor,
      );
      gestor.actualizarFunko(funkoActualizado);
    },
  )
  // Comando para eliminar un Funko
  .command<ArgsUsuarioId>(
    "eliminar",
    "Elimina un Funko de la colección.",
    (yargs) =>
      yargs.options({
        usuario: {
          type: "string",
          demandOption: true,
          describe: "Nombre del usuario",
        },
        id: {
          type: "number",
          demandOption: true,
          describe: "Identificador del Funko",
        },
      }),
    (args) => {
      const gestor = new GestorFunko(args.usuario);
      gestor.eliminarFunko(args.id);
    },
  )
  // Comando para listar todos los Funkos
  .command<ArgsUsuario>(
    "listar",
    "Lista todos los Funkos de la colección.",
    (yargs) =>
      yargs.options({
        usuario: {
          type: "string",
          demandOption: true,
          describe: "Nombre del usuario",
        },
      }),
    (args) => {
      const gestor = new GestorFunko(args.usuario);
      gestor.listarFunkos();
    },
  )
  // Comando para leer un Funko específico
  .command<ArgsUsuarioId>(
    "leer",
    "Muestra la información de un Funko específico.",
    (yargs) =>
      yargs.options({
        usuario: {
          type: "string",
          demandOption: true,
          describe: "Nombre del usuario",
        },
        id: {
          type: "number",
          demandOption: true,
          describe: "Identificador del Funko",
        },
      }),
    (args) => {
      const gestor = new GestorFunko(args.usuario);
      gestor.leerFunko(args.id);
    },
  )
  .help().argv;
