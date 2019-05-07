import fs from "fs";
export class Generador {
    argumentos: Array<string>;
    accion: string;
    nombre_proyecto: string;
    nombre_modulo: string;
    nombre_claseORM: string;
    nombre_interfaz: string;

    constructor(args: string[]) {
        this.bienvenida();
        this.argumentos = args;
        this.accion = args[0];
        this.determinarAccion(this.accion);
    }
    bienvenida() {
        console.log('¡Bienvenido a la herramienta de consola de fractal-sequelize-template!');
    }

    determinarAccion(accion: string) {
        if (accion === 'crear') {
            this.crearProyecto();
        } else if (accion === 'generar') {
            this.generarClase();
        }
    }

    crearProyecto() {
        const dirActual = process.cwd();
        this.nombre_proyecto = this.argumentos[1];
        const dirProyecto = `${dirActual}/${this.nombre_proyecto}`;
        if (!fs.existsSync(dirProyecto)) {
            fs.mkdirSync(dirProyecto);
            fs.mkdirSync(`${dirProyecto}/app`);
            fs.mkdirSync(`${dirProyecto}/docs`);
            fs.mkdirSync(`${dirProyecto}/assets`);
            fs.mkdirSync(`${dirProyecto}/deploy`);
            fs.mkdirSync(`${dirProyecto}/dev`);
            fs.mkdirSync(`${dirProyecto}/migrations`);
            fs.mkdirSync(`${dirProyecto}/test`);
            fs.mkdirSync(`${dirProyecto}/config`);
        }
    }

    generarClase() { }
};