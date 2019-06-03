"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var version = '0.0.3';
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
            this.dirProyecto = this.dirActual + "/" + this.nombreProyecto;
            this.generarProyecto();
            this.generarPackage();
            this.iniciarGit();
            this.generarArchivosFRCTL();
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
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
            fs_1.default.writeFileSync(dir + "/" + nombre + "." + ext, data);
        }
        else {
            fs_1.default.writeFileSync(dir + "/" + nombre + "." + ext, data);
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
        fs_1.default.writeFileSync(this.dirProyecto + '/frctl.json', JSON.stringify({
            proyecto: this.nombreProyecto,
            fechaIni: Date.now(),
            version: version
        }));
        //se crea el archivo de servidor
        fs_1.default.writeFileSync(this.dirProyecto + '/app/server.ts', "\nimport express from 'express';\nimport cors from 'cors';\nimport helmet from 'helmet';\nimport requestIp from 'request-ip';\nimport { config } from '../config/config.dev';\nimport { bootstrapRoutes } from './routes/init-routes.module';\nimport ORM from './orm/orm.module';\nimport http from 'http';\nimport https from 'https';\nconst app = express();\n    app.use(express.json({limit: '50mb'}));\n    app.use(express.urlencoded({limit: '50mb'}));\n    app.use('/static' ,express.static('public'));\n//inicializador de rutas\n\nconst orm = new ORM();\n//middlewares que se ejecutar\u00E1n antes de las peticiones\napp.use(cors());\napp.use(helmet());\napp.use(requestIp.mw());\n// app.use(compression());\nbootstrapRoutes(app);\nconst server = http.createServer(app);\nserver.listen(config.PORT);\n        ");
        //archivo de modulo de ORM
        fs_1.default.writeFileSync(this.dirProyecto + '/app/ORM/orm.module.ts', "        \nimport { Sequelize, ISequelizeConfig } from 'sequelize-typescript';\nimport { _CONFIG } from \"../../config/db.dev\";\nimport { MODULE_CLASSES } from \"./modulo/index\";\nexport default class ORM {\n    private static _instance: ORM;\n    public seql: Sequelize;\n    public config: ISequelizeConfig;\n    private modules: string[] = [];\n\n    constructor() {\n        this.config = _CONFIG;\n        this.seql = new Sequelize(this.config);\n        this.modules = this.modules.concat(\n            MODULE_CLASSES\n        );\n        this.seql.addModels(this.modules);\n    }\n\n    public static get instance() {\n        return this._instance || (this._instance = new this());\n    }\n}\n");
        //índice de clases
        this.escrituraSegura(this.dirProyecto + '/app/ORM/modulo', 'index', 'ts', "\n//aqui ir\u00E1n tus clases\nexport const MODULE_CLASSES: any[] = [];\n");
        //ruta
        this.escrituraSegura(this.dirProyecto + '/app/routes/inicio', 'inicio.routes', 'ts', "\nimport express, { Response, Request } from 'express';\nexport const index_router = express.Router();\n\nindex_router.get('/index',(req:Request,res:Response)=>{\n    res.json('\u00A1\u00C9xito!');\n});\n        ");
        //archivo de rutas
        this.escrituraSegura(this.dirProyecto + '/app/routes', 'init-routes.module', 'ts', "\n//parsers\nimport bodyParser from \"body-parser\";\nimport index_router from \"./inicio/inicio.routes\";\n//interfaces\nimport { Application, Request, Response } from 'express';\nconst routes = [\n    index_router\n];\nexport function bootstrapRoutes(app: Application) {\n    app.use(bodyParser.json()); // para application/json\n    app.use(bodyParser.urlencoded({ extended: true })); // para application/x-www-form-urlencoded\n    app.use(routes);\n\n    app.use('*', (req: Request, res: Response) => {\n        res.status(404).send();\n    });\n}\n");
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
        var data = "\n{\n    \"name\": \"" + this.nombreProyecto + "\",\n    \"version\": \"0.0.1\",\n    \"description\": \"\",\n    \"main\": \"\",\n    \"scripts\": {},\n    \"author\": \"\",\n    \"license\": \"MIT\"\n}";
        try {
            fs_1.default.writeFileSync(this.dirActual + "/" + this.nombreProyecto + "/package.json", data);
        }
        catch (error) {
            console.log(error);
        }
    };
    /**
     * Inicializa un repositorio local de Git.
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
    return Generador;
}());
exports.Generador = Generador;
;
