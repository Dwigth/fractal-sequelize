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
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var readline_1 = __importDefault(require("readline"));
var clases_1 = require("../util/clases");
var util_1 = require("../util/util");
var version = '0.0.3';
exports.nombreProyecto = '';
var Generador = /** @class */ (function () {
    /**
     * [0][accion]                        |Necesario
     * [1][tipo]                          |Necesario
     * [2][nomber_modulo/Proyecto]        |Necesario
     * [3][opciones]
     * @param args
     */
    function Generador(args) {
        this.puedoCrear = false;
        this.modulosNPM = [
            'moment',
            'nodemon',
            'sequelize',
            'sequelize-cli',
            'sequelize-typescript'
        ];
        this.directorios = [
            '/app',
            '/app/actions',
            '/app/helpers',
            '/app/middlewares',
            '/app/orm',
            '/app/routes',
            '/app/test',
            '/app/util',
            '/docs',
            '/assets',
            '/deploy',
            '/dev',
            '/migrations',
            '/test',
            '/config'
        ];
        this.bienvenida();
        this.argumentos = args;
        this.accion = args[0];
        this.dirActual = process.cwd();
        this.obtenerArchivoFRCTL();
    }
    /**
     * Bienvenida de CLI
     */
    Generador.prototype.bienvenida = function () {
        // console.log('[ES]', '¡Bienvenido a la herramienta de consola de fractal-sequelize-template!');
        // console.log('[EN]', ' Welcome to fractal-sequelize-template cli tool!');
        for (var index = 0; index < 5; index++) {
            process.stdout.write('|');
            var lines = 50;
            if (index === 2) {
                lines = 43;
            }
            for (var j = 0; j < lines; j++) {
                process.stdout.write('/');
                if (index === 2 && j === 20) {
                    process.stdout.write('FRACTAL');
                }
            }
            console.log('|');
        }
    };
    /**
     * Determina la accion a tomar.
     * @param accion Accion dada por el usuario
     */
    Generador.prototype.determinarAccion = function (accion) {
        return __awaiter(this, void 0, void 0, function () {
            var respuesta;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(accion === 'nuevo')) return [3 /*break*/, 1];
                        this.nombreProyecto = this.argumentos[1];
                        if (!this.puedoCrear) {
                            console.log('Error: Ya se encuentra dentro de un proyecto FRACTAL.');
                            return [2 /*return*/];
                        }
                        else if (this.nombreProyecto === undefined || this.nombreProyecto === '') {
                            console.log("Error: Nombre de proyecto no proporcionado");
                            return [2 /*return*/];
                        }
                        exports.nombreProyecto = this.nombreProyecto;
                        this.dirProyecto = this.dirActual + "/" + this.nombreProyecto;
                        this.generarProyecto();
                        this.generarPackage();
                        this.iniciarGit();
                        this.generarArchivosFRCTL();
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(accion === 'generar')) return [3 /*break*/, 5];
                        this.tipo = this.argumentos[1];
                        this.moduloTipo = this.argumentos[2];
                        this.nombreTipo = this.argumentos[3];
                        if (!(this.tipo === 'clase')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.hacerPregunta('¿le gustaría crear una interfaz tambien? s/n \n')];
                    case 2:
                        respuesta = _a.sent();
                        if (respuesta === 's') {
                            this.generarInterfaz();
                        }
                        console.log('Generando clase...');
                        this.generarClase();
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.tipo === 'interfaz') {
                            this.generarInterfaz();
                            console.log('Generando interfaz...');
                        }
                        else if (this.tipo === 'modelo') {
                            this.generarInterfaz();
                            this.generarClaseORM();
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (accion === 'ls') {
                            console.log(process.cwd());
                        }
                        else if (accion === 'test') {
                            this.descargarDependencias();
                        }
                        else {
                            console.log('¿Qué acción le gustaría ejecutar?');
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Generador.prototype.hacerPregunta = function (query) {
        var rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        return new Promise(function (resolve) { return rl.question(query, function (ans) {
            rl.close();
            resolve(ans);
        }); });
    };
    Generador.prototype.escrituraSegura = function (dir, nombre, ext, data) {
        try {
            //si no existe el proyecto
            var cdir = void 0;
            if (this.puedoCrear) {
                cdir = this.dirActual + "/" + this.nombreProyecto + dir;
            }
            else {
                cdir = this.dirActual + "/" + dir;
            }
            if (!fs_1.default.existsSync("" + cdir)) {
                fs_1.default.mkdirSync("" + cdir);
                fs_1.default.writeFile(cdir + "/" + nombre + "." + ext, data, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(dir + "/" + nombre + "." + ext + " \u00A1creado!");
                });
            }
            else {
                fs_1.default.writeFile(cdir + "/" + nombre + "." + ext, data, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(dir + "/" + nombre + "." + ext + " \u00A1creado!");
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    /**
     * Genera un proyecto FRCTL
     */
    Generador.prototype.generarProyecto = function () {
        var _this = this;
        if (!fs_1.default.existsSync(this.dirProyecto)) {
            fs_1.default.mkdirSync(this.dirProyecto);
            this.directorios.forEach(function (dir) {
                fs_1.default.mkdirSync("" + _this.dirProyecto + dir);
            });
        }
    };
    Generador.prototype.obtenerArchivoFRCTL = function () {
        try {
            var proyecto = require(this.dirActual + '/frctl.json');
            this.nombreProyecto = proyecto.proyecto;
            console.log('Proyecto actual: ' + proyecto.proyecto);
            this.determinarAccion(this.accion);
        }
        catch (error) {
            if (error.code == 'MODULE_NOT_FOUND') {
                console.error("No existe un proyecto de FRACTAL en este directorio");
                console.log('Use "frctl nuevo" para crear un proyecto.');
                this.puedoCrear = true;
                this.determinarAccion(this.accion);
                return;
            }
        }
    };
    /**
     * Genera un archivo JSON con información del proyecto
     */
    Generador.prototype.generarArchivosFRCTL = function () {
        var _this = this;
        fs_1.default.writeFileSync(this.dirProyecto + '/frctl.json', JSON.stringify({
            proyecto: this.nombreProyecto,
            fechaIni: Date.now(),
            version: version
        }));
        //se crean los otros archivos
        clases_1.Clases.map(function (clase) {
            _this.escrituraSegura(clase.direccion, clase.clase, clase.ext, clase.contenido);
        });
    };
    /**
     * Genera una clase CONTROLADOR
     */
    Generador.prototype.generarClase = function () {
        //asignar direccion
        var claseDir = "/app/actions/" + this.moduloTipo;
        var nombreClase = this.nombreTipo[0].toUpperCase() + this.nombreTipo.slice(1, this.nombreTipo.length).toLowerCase();
        nombreClase = util_1.EstilizarNombreClase(nombreClase);
        var dataClase = "\nexport class " + nombreClase + "Controller {\n    constructor() {};\n    // Agregar m\u00E9todos\n}\n        ";
        this.escrituraSegura(claseDir, this.nombreTipo + '.controller', 'ts', dataClase);
    };
    /**
     * Genera una clase del ORM sequelize-typescript
     */
    Generador.prototype.generarClaseORM = function () {
        var claseDir = "/app/orm/" + this.moduloTipo;
        var helperDir = "../../helpers/" + this.moduloTipo;
        var dataORM = "\n\n    import { Model, Table, Column, DataType } from \"sequelize-typescript\";\n    import { " + this.nombreTipo.toUpperCase() + " } from '" + helperDir + "/" + this.nombreTipo + "';\n    @Table({\n        tableName:'" + this.nombreTipo.toLowerCase() + "'\n    })\n    export class M_" + this.nombreTipo.toUpperCase() + " extends Model<M_" + this.nombreTipo.toUpperCase() + "> implements " + this.nombreTipo.toUpperCase() + " {}";
        this.escrituraSegura(claseDir, this.nombreTipo + '.model', 'ts', dataORM);
    };
    /**
     * Genera una interfaz
     */
    Generador.prototype.generarInterfaz = function () {
        var interfazDir = "/app/helpers/" + this.moduloTipo;
        var nombreInterfaz = this.nombreTipo.toUpperCase();
        var dataInterfaz = "\nexport interface " + nombreInterfaz + "{\n\n}\n        ";
        this.escrituraSegura(interfazDir, this.nombreTipo, 'ts', dataInterfaz);
    };
    /**
     * Genera un archivo package.json
     */
    Generador.prototype.generarPackage = function () {
        var data = "\n{\n    \"name\": \"" + this.nombreProyecto + "\",\n    \"version\": \"0.0.1\",\n    \"description\": \"\",\n    \"main\": \"\",\n    \"scripts\": {\n        \"start\": \"nodemon dev/app/server.js\",\n        \"serve\": \"set SECRET=123456789 && npm start\",\n    },\n    \"author\": \"\",\n    \"license\": \"MIT\",\n    \"dependencies\": {\n        \"@types/bcrypt\": \"^3.0.0\",\n        \"@types/body-parser\": \"^1.17.0\",\n        \"@types/colors\": \"^1.2.1\",\n        \"@types/compression\": \"0.0.36\",\n        \"@types/cors\": \"^2.8.4\",\n        \"@types/express\": \"^4.17.0\",\n        \"@types/express-jwt\": \"0.0.41\",\n        \"@types/fs-extra\": \"^8.0.0\",\n        \"@types/helmet\": \"0.0.42\",\n        \"@types/html-pdf\": \"^2.1.2\",\n        \"@types/jsonwebtoken\": \"^8.3.0\",\n        \"@types/md5\": \"^2.1.33\",\n        \"@types/moment\": \"^2.13.0\",\n        \"@types/moment-timezone\": \"^0.5.10\",\n        \"@types/node\": \"^11.13.13\",\n        \"@types/node-schedule\": \"^1.2.3\",\n        \"@types/request-ip\": \"0.0.33\",\n        \"@types/sequelize\": \"^4.28.3\",\n        \"@types/socket.io\": \"^2.1.2\",\n        \"bcrypt\": \"^3.0.4\",\n        \"body-parser\": \"^1.18.3\",\n        \"colors\": \"^1.3.3\",\n        \"compression\": \"^1.7.4\",\n        \"cors\": \"^2.8.5\",\n        \"express\": \"^4.17.1\",\n        \"express-jwt\": \"^5.3.1\",\n        \"express-pdf\": \"^1.2.2\",\n        \"fs-extra\": \"^8.0.1\",\n        \"helmet\": \"^3.18.0\",\n        \"jsonwebtoken\": \"^8.4.0\",\n        \"md5\": \"^2.2.1\",\n        \"moment\": \"^2.24.0\",\n        \"moment-timezone\": \"^0.5.23\",\n        \"node-schedule\": \"^1.3.2\",\n        \"nodemon\": \"^1.19.1\",\n        \"pg\": \"^7.11.0\",\n        \"pg-hstore\": \"^2.3.3\",\n        \"reflect-metadata\": \"^0.1.13\",\n        \"request-ip\": \"^2.1.3\",\n        \"rootpath\": \"^0.1.2\",\n        \"sequelize\": \"^4.44.0\",\n        \"sequelize-cli\": \"^5.4.0\",\n        \"sequelize-typescript\": \"^0.6.11\",\n        \"var-clean\": \"^1.0.1\"\n    }\n}";
        try {
            fs_1.default.writeFileSync(this.dirActual + "/" + this.nombreProyecto + "/package.json", data);
        }
        catch (error) {
            console.log(error);
        }
    };
    /**
     * Inicializa un repositorio local de Git.
     * @todo agregar archivo .gitignore
     */
    Generador.prototype.iniciarGit = function () {
        child_process_1.exec("git init " + this.nombreProyecto, function (error, stdout, stderr) {
            if (error) {
                console.error("exec error: " + error);
                return;
            }
            console.log("stdout: " + stdout);
            console.log("stderr: " + stderr);
        });
    };
    /**
     * Crear un proceso para descargar las dependencias de node.
     * @todo Hacer que funcione
     * @param dependencias Arreglo de dependencias de NPM
     */
    Generador.prototype.descargarDependencias = function (dependencias) {
        return __awaiter(this, void 0, void 0, function () {
            var n;
            return __generator(this, function (_a) {
                try {
                    n = child_process_1.spawn('cmd', ['/C', 'start cmd.exe /k npm install exit']);
                    // const arr_deps = dependencias.map(dep => {
                    //     return new Promise((resolve, reject) => {
                    //         exec(`npm install ${dep}`, (error, stdout, stderr) => {
                    //             if (error) {
                    //                 console.error(`exec error: ${error}`);
                    //                 reject(error);
                    //             }
                    //             resolve({ stdout, stderr });
                    //             console.log(`stdout: ${stdout}`);
                    //             console.log(`stderr: ${stderr}`);
                    //         });
                    //     });
                    // });
                    // const resultado = await Promise.all(arr_deps);
                    // console.log(resultado);
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    return Generador;
}());
exports.Generador = Generador;
;
