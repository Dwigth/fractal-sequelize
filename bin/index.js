#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gen_1 = require("./util/gen");
//Obtenener input
var args = process.argv.slice(2);
//obtener directorio actual
var gen = new gen_1.Generador(args);
// let cdir: string = __dirname;
// directorio app
// let appDir = cdir.substring(0, cdir.length - 5);
// var target = "dist";
// var found = appDir.search(target);
// //bifurcación y union de la direccion root del proyecto y no de distribución
// var firstpart = appDir.substr(0, found);
// var secondpart = appDir.substr(found + target.length + 1, appDir.length - 1);
// var appDirRoot = firstpart + secondpart;
// //obtener valores de argumentos
// let nombre_modulo = args[0];
// let nombre_clase_ORM = args[1];
// let nombre_interfaz = args[2];
// if (nombre_interfaz == null || nombre_interfaz == "") {
//     nombre_interfaz = nombre_clase_ORM;
//     console.log(`Renombrando interfaz a ${nombre_clase_ORM}`)
// }
// //asignar direcciones 
// const helperDir = `${appDirRoot}/helpers/${nombre_modulo}`;
// const ormDir = `${appDirRoot}/orm/${nombre_modulo}`;
// //verificar direciones
// const ormDirExist = verificar_directorio(ormDir);
// const helperDirExist = verificar_directorio(helperDir);
// if (helperDirExist && ormDirExist) {
//     const nombre_clase_dir = `${ormDir}/${nombre_clase_ORM}.model.ts`;
//     const nombre_interfaz_dir = `${helperDir}/${nombre_interfaz}.ts`;
//     let comments = `
//     /**
//     @description: Esta clase representa un modelo SEQUELIZE.
//     */`;
//     let dataInterface = `export interface ${nombre_interfaz.toUpperCase()}{
//     }`;
//     let dataORM = `\n
//     import { Model, Table, Column, DataType } from "sequelize-typescript";
//     import { ${nombre_interfaz.toUpperCase()} } from '../../${nombre_interfaz_dir.substring(60, nombre_interfaz_dir.length - 3)}';
//     @Table({
//         tableName:'${nombre_clase_ORM.toLowerCase()}'
//     })
//     export class M_${nombre_clase_ORM.toUpperCase()} extends Model<M_${nombre_clase_ORM.toUpperCase()}> implements ${nombre_interfaz.toUpperCase()} {}`;
//     let clas = comments + dataORM;
//     let inter = dataInterface;
//     // console.log(nombre_clase_dir + "\n"+nombre_interfaz_dir);
//     // console.log(nombre_interfaz_dir.search("helpers"));
//     fs.writeFileSync(nombre_clase_dir, clas, { encoding: 'utf8' });
//     fs.writeFileSync(nombre_interfaz_dir, inter, { encoding: 'utf8' })
// }
// async function verificar_directorio(dir: string) {
//     let chequeo = new Promise((resolve, reject) => {
//         let respuesta = fs.readdirSync(dir, { encoding: "utf8" });
//         if (respuesta.length >= 1) { resolve(true) } else { reject(false) }
//     })
//     return await chequeo;
// }
