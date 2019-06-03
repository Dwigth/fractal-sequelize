import fs from "fs";
import { exec } from 'child_process';
const version = '0.0.3';

export class Generador {
    argumentos: Array<string>;
    accion: string;
    nombreProyecto: string;
    nombreTipo: string;
    tipo: string;
    dirActual: string;
    dirProyecto: string;
    modulosNPM: Array<string> = [
        'moment',
        'nodemon',
        'sequelize',
        'sequelize-cli',
        'sequelize-typescript'
    ];
    directorios: Array<string> = [
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
    /**
     * [0][accion]                        |Necesario
     * [1][tipo]                          |Necesario
     * [2][nomber_modulo/Proyecto]        |Necesario
     * [3][opciones]
     * @param args 
     */
    constructor(args: string[]) {
        this.bienvenida();
        this.argumentos = args;
        this.accion = args[0];
        this.dirActual = process.cwd();
        this.determinarAccion(this.accion);
    }
    /**
     * Bienvenida de CLI
     */
    bienvenida() {
        // console.log('[ES]', '¡Bienvenido a la herramienta de consola de fractal-sequelize-template!');
        // console.log('[EN]', ' Welcome to fractal-sequelize-template cli tool!');
        for (let index = 0; index < 5; index++) {
            process.stdout.write('|');
            let lines = 50;
            if (index === 2) {
                lines = 43;
            }
            for (let j = 0; j < lines; j++) {
                process.stdout.write('/');
                if (index === 2 && j === 20) {
                    process.stdout.write('FRACTAL');
                }
            }
            console.log('|')
        }
    }
    /**
     * Determina la accion a tomar.
     * @param accion Accion dada por el usuario
     */
    determinarAccion(accion: string) {
        if (accion === 'nuevo') {
            this.nombreProyecto = this.argumentos[1];
            this.dirProyecto = `${this.dirActual}/${this.nombreProyecto}`;
            this.generarProyecto();
            this.generarPackage();
            this.iniciarGit();
            this.generarArchivosFRCTL();
        } else if (accion === 'generar') {
            this.tipo = this.argumentos[1];
            this.nombreTipo = this.argumentos[2];
            this.generarClase();
        } else if (accion === 'ls') {
            console.log(process.cwd());
        }
    }

    escrituraSegura(dir: string, nombre: string, ext: string, data: any) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.writeFileSync(`${dir}/${nombre}.${ext}`, data);
        } else {
            fs.writeFileSync(`${dir}/${nombre}.${ext}`, data);
        }
    }

    /**
     * Genera un proyecto FRCTL
     */
    generarProyecto() {
        if (!fs.existsSync(this.dirProyecto)) {
            fs.mkdirSync(this.dirProyecto);
            this.directorios.forEach(dir => {
                fs.mkdirSync(`${this.dirProyecto}${dir}`);
            });
        }
    }
    /**
     * Genera un archivo JSON con información del proyecto
     */
    generarArchivosFRCTL() {
        fs.writeFileSync(this.dirProyecto + '/frctl.json', JSON.stringify({
            proyecto: this.nombreProyecto,
            fechaIni: Date.now(),
            version: version
        }));
        //se crea el archivo de servidor
        fs.writeFileSync(this.dirProyecto + '/app/server.ts', `
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import requestIp from 'request-ip';
import { config } from '../config/config.dev';
import { bootstrapRoutes } from './routes/init-routes.module';
import ORM from './orm/orm.module';
import http from 'http';
import https from 'https';
const app = express();
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use('/static' ,express.static('public'));
//inicializador de rutas

const orm = new ORM();
//middlewares que se ejecutarán antes de las peticiones
app.use(cors());
app.use(helmet());
app.use(requestIp.mw());
// app.use(compression());
bootstrapRoutes(app);
const server = http.createServer(app);
server.listen(config.PORT);
        `);
        //archivo de modulo de ORM
        fs.writeFileSync(this.dirProyecto + '/app/ORM/orm.module.ts', `        
import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';
import { _CONFIG } from "../../config/db.dev";
import { MODULE_CLASSES } from "./modulo/index";
export default class ORM {
    private static _instance: ORM;
    public seql: Sequelize;
    public config: ISequelizeConfig;
    private modules: string[] = [];

    constructor() {
        this.config = _CONFIG;
        this.seql = new Sequelize(this.config);
        this.modules = this.modules.concat(
            MODULE_CLASSES
        );
        this.seql.addModels(this.modules);
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}
`);
        //índice de clases
        this.escrituraSegura(this.dirProyecto + '/app/ORM/modulo', 'index', 'ts', `
//aqui irán tus clases
export const MODULE_CLASSES: any[] = [];
`);
        //ruta
        this.escrituraSegura(this.dirProyecto + '/app/routes/inicio', 'inicio.routes', 'ts', `
import express, { Response, Request } from 'express';
export const index_router = express.Router();

index_router.get('/index',(req:Request,res:Response)=>{
    res.json('¡Éxito!');
});
        `);
        //archivo de rutas
        this.escrituraSegura(this.dirProyecto + '/app/routes', 'init-routes.module', 'ts', `
//parsers
import bodyParser from "body-parser";
import index_router from "./inicio/inicio.routes";
//interfaces
import { Application, Request, Response } from 'express';
const routes = [
    index_router
];
export function bootstrapRoutes(app: Application) {
    app.use(bodyParser.json()); // para application/json
    app.use(bodyParser.urlencoded({ extended: true })); // para application/x-www-form-urlencoded
    app.use(routes);

    app.use('*', (req: Request, res: Response) => {
        res.status(404).send();
    });
}
`);
    }


    /**
     * Genera una clase
     */
    generarClase() {
        const targetDir = 'dist';
    }

    /**
     * Genera una clase del ORM sequelize-typescript
     */
    genClaseORM() { }
    /**
     * Genera una interfaz 
     */
    genInterfaz() { }

    /**
     * Genera un archivo package.json
     */
    generarPackage() {
        const data = `
{
    "name": "${this.nombreProyecto}",
    "version": "0.0.1",
    "description": "",
    "main": "",
    "scripts": {},
    "author": "",
    "license": "MIT"
}`;
        try {
            fs.writeFileSync(`${this.dirActual}/${this.nombreProyecto}/package.json`, data);
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Inicializa un repositorio local de Git.
     */
    iniciarGit() {
        exec(`git init ${this.nombreProyecto}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
};