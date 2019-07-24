import fs from "fs";
import { exec } from 'child_process';
import { Clases } from "../util/clases";
const version = '0.0.3';

export let nombreProyecto = '';

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
            nombreProyecto = this.nombreProyecto;
            this.dirProyecto = `${this.dirActual}/${this.nombreProyecto}`;
            this.generarProyecto();
            this.generarPackage();
            this.iniciarGit();
            this.generarArchivosFRCTL();
            // this.descargarDependencias(this.modulosNPM);
        } else if (accion === 'generar') {
            this.tipo = this.argumentos[1];
            this.nombreTipo = this.argumentos[2];
            this.generarClase();
        } else if (accion === 'ls') {
            console.log(process.cwd());
        }
    }

    escrituraSegura(dir: string, nombre: string, ext: string, data: any) {
        try {
            if (!fs.existsSync(`${this.dirActual}/${this.nombreProyecto}${dir}`)) {
                fs.mkdirSync(`${this.dirActual}/${this.nombreProyecto}${dir}`);
                fs.writeFile(`${this.dirActual}/${this.nombreProyecto}${dir}/${nombre}.${ext}`, data, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(`${dir}/${nombre}.${ext} ¡creado!`);
                });
            } else {
                fs.writeFile(`${this.dirActual}/${this.nombreProyecto}${dir}/${nombre}.${ext}`, data, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(`${dir}/${nombre}.${ext} ¡creado!`);
                });
            }
        } catch (error) {
            console.log(error)
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
        //se crean los otros archivos
        Clases.map(clase => {
            this.escrituraSegura(clase.direccion, clase.clase, clase.ext, clase.contenido);
        });

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
    "scripts": {
        "start": "nodemon dev/app/server.js",
        "serve": "set SECRET=123456789 && npm start",
    },
    "author": "",
    "license": "MIT",
    "dependencies": {
        "@types/bcrypt": "^3.0.0",
        "@types/body-parser": "^1.17.0",
        "@types/colors": "^1.2.1",
        "@types/compression": "0.0.36",
        "@types/cors": "^2.8.4",
        "@types/express": "^4.17.0",
        "@types/express-jwt": "0.0.41",
        "@types/fs-extra": "^8.0.0",
        "@types/helmet": "0.0.42",
        "@types/html-pdf": "^2.1.2",
        "@types/jsonwebtoken": "^8.3.0",
        "@types/md5": "^2.1.33",
        "@types/moment": "^2.13.0",
        "@types/moment-timezone": "^0.5.10",
        "@types/node": "^11.13.13",
        "@types/node-schedule": "^1.2.3",
        "@types/request-ip": "0.0.33",
        "@types/sequelize": "^4.28.3",
        "@types/socket.io": "^2.1.2",
        "bcrypt": "^3.0.4",
        "body-parser": "^1.18.3",
        "colors": "^1.3.3",
        "compression": "^1.7.4",
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "express-jwt": "^5.3.1",
        "express-pdf": "^1.2.2",
        "fs-extra": "^8.0.1",
        "helmet": "^3.18.0",
        "jsonwebtoken": "^8.4.0",
        "md5": "^2.2.1",
        "moment": "^2.24.0",
        "moment-timezone": "^0.5.23",
        "node-schedule": "^1.3.2",
        "nodemon": "^1.19.1",
        "pg": "^7.11.0",
        "pg-hstore": "^2.3.3",
        "reflect-metadata": "^0.1.13",
        "request-ip": "^2.1.3",
        "rootpath": "^0.1.2",
        "sequelize": "^4.44.0",
        "sequelize-cli": "^5.4.0",
        "sequelize-typescript": "^0.6.11",
        "var-clean": "^1.0.1"
    }
}`;
        try {
            fs.writeFileSync(`${this.dirActual}/${this.nombreProyecto}/package.json`, data);
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Inicializa un repositorio local de Git.
     * @todo agregar archivo .gitignore
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

    async descargarDependencias(dependencias: Array<string>) {
        try {
            const arr_deps = dependencias.map(dep => {
                return new Promise((resolve, reject) => {
                    exec(`npm install ${dep}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`exec error: ${error}`);
                            reject(error);
                        }
                        resolve({ stdout, stderr });
                        console.log(`stdout: ${stdout}`);
                        console.log(`stderr: ${stderr}`);
                    });
                });
            });
            const resultado = await Promise.all(arr_deps);
            console.log(resultado);
        } catch (error) {
            console.log(error);
        }


    }

};