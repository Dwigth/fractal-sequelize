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
var clases_1 = require("../util/clases");
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
        this.determinarAccion(this.accion);
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
        if (accion === 'nuevo') {
            this.nombreProyecto = this.argumentos[1];
            exports.nombreProyecto = this.nombreProyecto;
            this.dirProyecto = this.dirActual + "/" + this.nombreProyecto;
            this.generarProyecto();
            this.generarPackage();
            this.iniciarGit();
            this.generarArchivosFRCTL();
            // this.descargarDependencias(this.modulosNPM);
        }
        else if (accion === 'generar') {
            this.tipo = this.argumentos[1];
            this.nombreTipo = this.argumentos[2];
            this.generarClase();
        }
        else if (accion === 'ls') {
            console.log(process.cwd());
        }
    };
    Generador.prototype.escrituraSegura = function (dir, nombre, ext, data) {
        try {
            if (!fs_1.default.existsSync(this.dirActual + "/" + this.nombreProyecto + dir)) {
                fs_1.default.mkdirSync(this.dirActual + "/" + this.nombreProyecto + dir);
                fs_1.default.writeFile(this.dirActual + "/" + this.nombreProyecto + dir + "/" + nombre + "." + ext, data, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(dir + "/" + nombre + "." + ext + " \u00A1creado!");
                });
            }
            else {
                fs_1.default.writeFile(this.dirActual + "/" + this.nombreProyecto + dir + "/" + nombre + "." + ext, data, function (err) {
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
     * Genera una clase
     */
    Generador.prototype.generarClase = function () {
        var targetDir = 'dist';
    };
    /**
     * Genera una clase del ORM sequelize-typescript
     */
    Generador.prototype.genClaseORM = function () { };
    /**
     * Genera una interfaz
     */
    Generador.prototype.genInterfaz = function () { };
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
    Generador.prototype.descargarDependencias = function (dependencias) {
        return __awaiter(this, void 0, void 0, function () {
            var arr_deps, resultado, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        arr_deps = dependencias.map(function (dep) {
                            return new Promise(function (resolve, reject) {
                                child_process_1.exec("npm install " + dep, function (error, stdout, stderr) {
                                    if (error) {
                                        console.error("exec error: " + error);
                                        reject(error);
                                    }
                                    resolve({ stdout: stdout, stderr: stderr });
                                    console.log("stdout: " + stdout);
                                    console.log("stderr: " + stderr);
                                });
                            });
                        });
                        return [4 /*yield*/, Promise.all(arr_deps)];
                    case 1:
                        resultado = _a.sent();
                        console.log(resultado);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Generador;
}());
exports.Generador = Generador;
;
