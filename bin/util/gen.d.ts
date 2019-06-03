export declare class Generador {
    argumentos: Array<string>;
    accion: string;
    nombreProyecto: string;
    nombreModulo: string;
    nombreClaseORM: string;
    nombreInterfaz: string;
    dirActual: string;
    dirProyecto: string;
    modulosNPM: Array<string>;
    directorios: Array<string>;
    constructor(args: string[]);
    bienvenida(): void;
    determinarAccion(accion: string): void;
    generarProyecto(): void;
    generarClase(): void;
    generarPackage(): void;
    iniciarGit(): void;
}
