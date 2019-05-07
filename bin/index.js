#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('welcome to fractal-sequelize-template cli tool!');
var fs_1 = __importDefault(require("fs"));
//Obtenener input
var args = process.argv.slice(2);
//obtener directorio actual
var cdir = __dirname;
//directorio app
var appDir = cdir.substring(0, cdir.length - 5);
var target = "dist";
var found = appDir.search(target);
//bifurcación y union de la direccion root del proyecto y no de distribución
var firstpart = appDir.substr(0, found);
var secondpart = appDir.substr(found + target.length + 1, appDir.length - 1);
var appDirRoot = firstpart + secondpart;
//obtener valores de argumentos
var nombre_modulo = args[0];
var nombre_clase_ORM = args[1];
var nombre_interfaz = args[2];
if (nombre_interfaz == null || nombre_interfaz == "") {
    nombre_interfaz = nombre_clase_ORM;
    console.log("Renombrando interfaz a " + nombre_clase_ORM);
}
//asignar direcciones 
var helperDir = appDirRoot + "/helpers/" + nombre_modulo;
var ormDir = appDirRoot + "/orm/" + nombre_modulo;
//verificar direciones
var ormDirExist = verificar_directorio(ormDir);
var helperDirExist = verificar_directorio(helperDir);
if (helperDirExist && ormDirExist) {
    var nombre_clase_dir = ormDir + "/" + nombre_clase_ORM + ".model.ts";
    var nombre_interfaz_dir = helperDir + "/" + nombre_interfaz + ".ts";
    var comments = "\n    /**\n    @description: Esta clase representa un modelo SEQUELIZE.\n    */";
    var dataInterface = "export interface " + nombre_interfaz.toUpperCase() + "{\n\n    }";
    var dataORM = "\n\n    import { Model, Table, Column, DataType } from \"sequelize-typescript\";\n    import { " + nombre_interfaz.toUpperCase() + " } from '../../" + nombre_interfaz_dir.substring(60, nombre_interfaz_dir.length - 3) + "';\n    @Table({\n        tableName:'" + nombre_clase_ORM.toLowerCase() + "'\n    })\n    export class M_" + nombre_clase_ORM.toUpperCase() + " extends Model<M_" + nombre_clase_ORM.toUpperCase() + "> implements " + nombre_interfaz.toUpperCase() + " {}";
    var clas = comments + dataORM;
    var inter = dataInterface;
    // console.log(nombre_clase_dir + "\n"+nombre_interfaz_dir);
    // console.log(nombre_interfaz_dir.search("helpers"));
    fs_1.default.writeFileSync(nombre_clase_dir, clas, { encoding: 'utf8' });
    fs_1.default.writeFileSync(nombre_interfaz_dir, inter, { encoding: 'utf8' });
}
function verificar_directorio(dir) {
    return __awaiter(this, void 0, void 0, function () {
        var chequeo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chequeo = new Promise(function (resolve, reject) {
                        var respuesta = fs_1.default.readdirSync(dir, { encoding: "utf8" });
                        if (respuesta.length >= 1) {
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    });
                    return [4 /*yield*/, chequeo];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
