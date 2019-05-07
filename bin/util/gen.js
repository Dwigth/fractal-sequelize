"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Generador = /** @class */ (function () {
    function Generador(args) {
        this.bienvenida();
        this.argumentos = args;
        this.accion = args[0];
        this.determinarAccion(this.accion);
    }
    Generador.prototype.bienvenida = function () {
        console.log('¡Bienvenido a la herramienta de consola de fractal-sequelize-template!');
    };
    Generador.prototype.determinarAccion = function (accion) {
        if (accion === 'crear') {
            this.crearProyecto();
        }
        else if (accion === 'generar') {
            this.generarClase();
        }
    };
    Generador.prototype.crearProyecto = function () {
        var dirActual = process.cwd();
        this.nombre_proyecto = this.argumentos[1];
        var dirProyecto = dirActual + "/" + this.nombre_proyecto;
        if (!fs_1.default.existsSync(dirProyecto)) {
            fs_1.default.mkdirSync(dirProyecto);
            fs_1.default.mkdirSync(dirProyecto + "/app");
            fs_1.default.mkdirSync(dirProyecto + "/docs");
            fs_1.default.mkdirSync(dirProyecto + "/assets");
            fs_1.default.mkdirSync(dirProyecto + "/deploy");
            fs_1.default.mkdirSync(dirProyecto + "/dev");
            fs_1.default.mkdirSync(dirProyecto + "/migrations");
            fs_1.default.mkdirSync(dirProyecto + "/test");
            fs_1.default.mkdirSync(dirProyecto + "/config");
        }
    };
    Generador.prototype.generarClase = function () { };
    return Generador;
}());
exports.Generador = Generador;
;
