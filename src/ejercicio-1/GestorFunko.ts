/**
 * @module GestorFunko
 */
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { Funko } from "./Funko.js";

/**
 * Clase para gestionar la colección de Funkos de un usuario.
 *
 * @remarks
 * La colección se persiste en el sistema de ficheros, almacenando cada Funko en un fichero JSON independiente.
 */
export class GestorFunko {
  private rutaBase: string;

  /**
   * Crea una instancia de GestorFunko.
   *
   * @param usuario - Nombre del usuario propietario de la colección.
   */
  constructor(private usuario: string) {
    this.rutaBase = path.join("funkos", this.usuario);
    if (!fs.existsSync(this.rutaBase)) {
      fs.mkdirSync(this.rutaBase, { recursive: true });
    }
  }

  /**
   * Agrega un Funko a la colección.
   *
   * @param funko - Instancia de Funko a agregar.
   * @returns void o undefined en caso de error.
   *
   * @remarks
   * Si ya existe un Funko con el mismo ID, se imprime un mensaje de error y se retorna undefined.
   */
  public agregarFunko(funko: Funko): void | undefined {
    const rutaArchivo = path.join(this.rutaBase, `${funko.id}.json`);
    if (fs.existsSync(rutaArchivo)) {
      console.log(chalk.red("El Funko ya existe en la colección."));
      return undefined;
    }
    fs.writeFileSync(rutaArchivo, JSON.stringify(funko, null, 2));
    console.log(chalk.green("Nuevo Funko agregado a la colección."));
  }

  /**
   * Actualiza un Funko existente en la colección.
   *
   * @param funko - Instancia de Funko con datos actualizados.
   * @returns void o undefined en caso de error.
   *
   * @remarks
   * Si no existe un Funko con el ID proporcionado, se imprime un mensaje de error y se retorna undefined.
   */
  public actualizarFunko(funko: Funko): void | undefined {
    const rutaArchivo = path.join(this.rutaBase, `${funko.id}.json`);
    if (!fs.existsSync(rutaArchivo)) {
      console.log(chalk.red("Funko no encontrado en la colección."));
      return undefined;
    }
    fs.writeFileSync(rutaArchivo, JSON.stringify(funko, null, 2));
    console.log(chalk.green("Funko actualizado en la colección."));
  }

  /**
   * Elimina un Funko de la colección.
   *
   * @param id - Identificador del Funko a eliminar.
   * @returns void o undefined en caso de error.
   *
   * @remarks
   * Si el Funko no se encuentra, se imprime un mensaje de error y se retorna undefined.
   */
  public eliminarFunko(id: number): void | undefined {
    const rutaArchivo = path.join(this.rutaBase, `${id}.json`);
    if (!fs.existsSync(rutaArchivo)) {
      console.log(chalk.red("Funko no encontrado en la colección."));
      return undefined;
    }
    fs.unlinkSync(rutaArchivo);
    console.log(chalk.green("Funko eliminado de la colección."));
  }

  /**
   * Lista todos los Funkos de la colección.
   *
   * @returns void.
   *
   * @remarks
   * Se muestra la información de cada Funko, coloreando el valor de mercado según los siguientes rangos:
   * - Menor a 10: rojo.
   * - Menor a 50: amarillo.
   * - Menor a 100: cian.
   * - Igual o mayor a 100: verde.
   */
  public listarFunkos(): void {
    const archivos = fs.readdirSync(this.rutaBase);
    if (archivos.length === 0) {
      console.log(chalk.yellow("No hay Funkos en la colección."));
      return;
    }

    console.log(chalk.blue(`${this.usuario} - Colección de Funkos`));
    console.log("-------------------------------");

    archivos.forEach((archivo: string): void => {
      const contenido = fs.readFileSync(
        path.join(this.rutaBase, archivo),
        "utf-8",
      );
      const datosFunko = JSON.parse(contenido);
      const colorValor = this.obtenerColorValor(datosFunko.valorMercado);
      console.log(
        chalk.white(
          `ID: ${datosFunko.id}\nNombre: ${datosFunko.nombre}\nTipo: ${datosFunko.tipo}`,
        ),
      );
      console.log(
        `Valor de Mercado: ${colorValor(datosFunko.valorMercado)}\n-------------------------------`,
      );
    });
  }

  /**
   * Muestra la información de un Funko específico.
   *
   * @param id - Identificador del Funko a mostrar.
   * @returns void o undefined en caso de error.
   *
   * @remarks
   * Si el Funko no se encuentra, se imprime un mensaje de error y se retorna undefined.
   */
  public leerFunko(id: number): void | undefined {
    const rutaArchivo = path.join(this.rutaBase, `${id}.json`);
    if (!fs.existsSync(rutaArchivo)) {
      console.log(chalk.red("Funko no encontrado en la colección."));
      return undefined;
    }
    const contenido = fs.readFileSync(rutaArchivo, "utf-8");
    const datosFunko = JSON.parse(contenido);
    const colorValor = this.obtenerColorValor(datosFunko.valorMercado);
    console.log(
      chalk.blueBright(
        `ID: ${datosFunko.id}\nNombre: ${datosFunko.nombre}\nDescripción: ${datosFunko.descripcion}\n` +
          `Tipo: ${datosFunko.tipo}\nGénero: ${datosFunko.genero}\n` +
          `Franquicia: ${datosFunko.franquicia}\nNúmero: ${datosFunko.numero}\n` +
          `Exclusivo: ${datosFunko.exclusivo}\nCaracterísticas Especiales: ${datosFunko.caracteristicasEspeciales}\n` +
          `Valor de Mercado: ${colorValor(datosFunko.valorMercado)}`,
      ),
    );
  }

  /**
   * Obtiene la función de color de chalk según el valor de mercado.
   *
   * @param valor - Valor de mercado.
   * @returns Función de chalk que aplica el color.
   *
   * @remarks
   * - Menor a 10: rojo.
   * - Menor a 50: amarillo.
   * - Menor a 100: cian.
   * - Igual o mayor a 100: verde.
   */
  private obtenerColorValor(valor: number): typeof chalk {
    if (valor < 10) {
      return chalk.red; // chalk.red es de tipo Chalk
    }
    if (valor < 50) {
      return chalk.yellow;
    }
    if (valor < 100) {
      return chalk.cyan;
    }
    return chalk.green;
  }
}
