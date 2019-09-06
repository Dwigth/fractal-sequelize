import { nombreProyecto } from '../util/gen';
export const Clases: Array<{ clase: string, contenido: string, direccion: string, ext: string }> = [
    {
        clase: 'server',
        ext: 'ts',
        direccion: '/app',
        contenido: `
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
console.log("Puerto ", config.PORT);
console.log("Modo: ", (process.env.NODE_ENV != undefined) ? 'Producción' : 'Desarrollo');`,
    },
    {
        clase: 'orm.module',
        ext: 'ts',
        direccion: '/app/ORM',
        contenido: `
import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';
import { CONFIG } from "../../config/db.dev";
import { MODULE_CLASSES } from "./modulo/index";
export default class ORM {
    private static _instance: ORM;
    public seql: Sequelize;
    public config: ISequelizeConfig;
    private modules: string[] = [];

    constructor() {
        this.config = CONFIG;
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
`,
    },
    {
        clase: 'index',
        ext: 'ts',
        direccion: '/app/ORM/modulo',
        contenido: `
//aqui irán tus clases
export const MODULE_CLASSES: any[] = [];
`,
    },
    {
        clase: 'inicio.routes',
        ext: 'ts',
        direccion: '/app/routes/inicio',
        contenido: `
import express, { Response, Request } from 'express';
export const index_router = express.Router();

index_router.get('/index',(req:Request,res:Response)=>{
    res.json('¡Éxito!');
});
`,
    },
    {
        clase: 'init-routes.module',
        ext: 'ts',
        direccion: '/app/routes',
        contenido: `
//parsers
import bodyParser from "body-parser";
import {index_router} from "./inicio/inicio.routes";
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
`,
    },
    {
        clase: 'config.dev',
        ext: 'ts',
        direccion: '/config',
        contenido: `
    export const config = {
        PORT: process.env.PORT || 2405 
    }
    `
    },
    {
        clase: 'db.dev',
        ext: 'ts',
        direccion: '/config',
        contenido: `
        import { ISequelizeConfig } from "sequelize-typescript";
import moment from 'moment-timezone';
const timezone = 'America/Mexico_City';
const momentTz = moment.tz.setDefault(timezone);

// Configuracion de desarrollo
export const CONFIG: ISequelizeConfig = {
    database: '',
    username: '',
    password: '',
    host: '',
    port: ,
    dialect: '',
    timezone: timezone,
    pool: {
        max: 10,
        min: 1,
        idle: 10000
    },
    logging: false
}

// Configuracion de PREPRODUCCION
// export const CONFIG: ISequelizeConfig = {
//     database: '',
//     username: '',
//     password: '',
//     host: '',
//     port: ,
//     dialect: '',
//     timezone: timezone,
//     pool: {
//         max: 10,
//         min: 1,
//         idle: 10000
//     },
//     logging: false
// }

// Configuracion de PRODUCCION
// export const CONFIG: ISequelizeConfig = {
//     database: '',
//     username: '',
//     password: '',
//     host: '',
//     port: ,
//     dialect: '',
//     timezone: ,
//     pool: {
//         max: 10,
//         min: 1,
//         idle: 10000
//     },
//     logging: false
// }


    `
    },
    {
        clase: 'ecosystem.config',
        ext: 'js',
        direccion: '',
        contenido: `
        module.exports = {
            apps: [{
                name: "${nombreProyecto}",
                script: "./deploy/app/server.js",
                watch: false,
                env: {
                    "NODE_ENV": "production",
                    "SECRET": 123456789,
                    "PORT": 3003
                }
            }
            ]
        }
        `
    },
    {
        clase: 'tsconfig',
        ext: 'json',
        direccion: '',
        contenido: `
        {
            "compilerOptions": {
              "baseUrl": ".",
              "paths": {
                "@actions/*": [
                    "app/actions/*"
                  ],
                  "@helpers/*": [
                    "app/helpers/*"
                  ],
                  "@middlewares/*": [
                    "app/middlewares/*"
                  ],
                  "@orm/*": [
                    "app/orm/*"
                  ],
                  "@routes/*": [
                    "app/routes/*"
                  ],
                  "@test/*": [
                    "app/test/*"
                  ],
                  "@util/*": [
                    "app/util/*"
                  ],
                "*": [
                  "types/*"
                ]
              },
              /* Basic Options */
              "target": "es6", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
              "module": "commonjs", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
              // "lib": [],                             /* Specify library files to be included in the compilation. */
              // "allowJs": true,                       /* Allow javascript files to be compiled. */  
              // "checkJs": true,                       /* Report errors in .js files. */
              // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
              // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
              // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
              // "sourceMap": true,                     /* Generates corresponding '.map' file. */
              // "outFile": "./",                       /* Concatenate and emit output to single file. */
              // "outDir": "./dist", /* Redirect output structure to the directory. */
              // "outDir": "./deploy", /*Version de produccion */
              "outDir": "./dev", /*Version de desarrollo */
              // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
              // "composite": true,                     /* Enable project compilation */
              // "removeComments": true,                /* Do not emit comments to output. */
              // "noEmit": true,                        /* Do not emit outputs. */
              // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
              // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
              // "isolatedModules": true,             .  /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
              /* Strict Type-Checking Options */
              "strict": true, /* Enable all strict type-checking options. */
              // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
              // "strictNullChecks": true,              /* Enable strict null checks. */
              // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
              // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
              "strictPropertyInitialization": false, /* Enable strict checking of property initialization in classes. */
              // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
              // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
              /* Additional Checks */
              // "noUnusedLocals": true,                /* Report errors on unused locals. */
              // "noUnusedParameters": true,            /* Report errors on unused parameters. */
              // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
              // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
              /* Module Resolution Options */
              // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
              // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
              // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
              // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
              // "typeRoots": [],                       /* List of folders to include type definitions from. */
              // "types": [],                           /* Type declaration files to be included in compilation. */
              // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
              "esModuleInterop": true, /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
              // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
              /* Source Map Options */
              // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
              // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
              // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
              // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
              /* Experimental Options */
              "experimentalDecorators": true, /* Enables experimental support for ES7 decorators. */
              "emitDecoratorMetadata": true, /* Enables experimental support for emitting type metadata for decorators. */
            }
          }
        `
    },
    {
        clase: '',
        ext: 'gitignore',
        direccion: '',
        contenido: `
# Modulos de node
node_modules

# Directorio de distribución
dist
dev
# Directorio de pruebas
deploy
# Archivo package-lock.json
 package-lock.json
# Carpeta Creacion Imagenes (Ignorada para pruebas desarrollo)
noticias_imagenes_BD
public
deploy.json
`
    }
];