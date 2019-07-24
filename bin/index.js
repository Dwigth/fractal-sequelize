#!/usr/bin/env node
"use strict";
/**
 * @author: Dwigth Astacio Hernández
 * @version: 0.0.2
 * @description: Generador de proyecto, clases e interfaces para sequelize-typescript
 * Input: [0][accion]                        |Necesario
 *        [1][tipo]                          |Necesario
 *        [2][nomber_modulo/Proyecto]        |Necesario
 *        [3][opciones]
 *
 * Directorio actual:       '**\app\util'
 * Directorio modelos ORM:  '**\app\orm\'
 * Directorio interfaces:   '**\app\helpers\'
 *
 * Por convención a las clases se les agregará .model al final de su nombre.
 * Si la clase no existe y la interfaz tampoco se crearán los archivos solicitados.
 * @todo: Si la clase no existe pero la interfaz sí solo se creará la clase y viceversa.
 * Si existe la clase se sobreescribirá.
 * @todo: Si no se especifica el nombre de la interfaz se utilizará el de la clase.
 * @todo: Si ya existe la interfaz copiar su contendio.
 * @todo: Permitir agregar contenido de la interfaz.
 * @todo: Agregar modelo al arreglo de modelos en el archivo index de cada módulo.
 * @todo: agregar archivos server, instalar orm, etc.
 * @example npm run gen agenda AG_NOTIFICACIONES
 * @example frctl nuevo notificaciones-api / frctl generar clase notificaciones[/]
 */
Object.defineProperty(exports, "__esModule", { value: true });
var gen_1 = require("./util/gen");
//Obtenener input
var args = process.argv.slice(2);
//obtener directorio actual
var gen = new gen_1.Generador(args);
