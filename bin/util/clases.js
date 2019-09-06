"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gen_1 = require("../util/gen");
exports.Clases = [
    {
        clase: 'server',
        ext: 'ts',
        direccion: '/app',
        contenido: "\nimport express from 'express';\nimport cors from 'cors';\nimport helmet from 'helmet';\nimport requestIp from 'request-ip';\nimport { config } from '../config/config.dev';\nimport { bootstrapRoutes } from './routes/init-routes.module';\nimport ORM from './orm/orm.module';\nimport http from 'http';\nimport https from 'https';\nconst app = express();\n    app.use(express.json({limit: '50mb'}));\n    app.use(express.urlencoded({limit: '50mb'}));\n    app.use('/static' ,express.static('public'));\n//inicializador de rutas\n\nconst orm = new ORM();\n//middlewares que se ejecutar\u00E1n antes de las peticiones\napp.use(cors());\napp.use(helmet());\napp.use(requestIp.mw());\n// app.use(compression());\nbootstrapRoutes(app);\nconst server = http.createServer(app);\nserver.listen(config.PORT);\nconsole.log(\"Puerto \", config.PORT);\nconsole.log(\"Modo: \", (process.env.NODE_ENV != undefined) ? 'Producci\u00F3n' : 'Desarrollo');",
    },
    {
        clase: 'orm.module',
        ext: 'ts',
        direccion: '/app/ORM',
        contenido: "\nimport { Sequelize, ISequelizeConfig } from 'sequelize-typescript';\nimport { CONFIG } from \"../../config/db.dev\";\nimport { MODULE_CLASSES } from \"./modulo/index\";\nexport default class ORM {\n    private static _instance: ORM;\n    public seql: Sequelize;\n    public config: ISequelizeConfig;\n    private modules: string[] = [];\n\n    constructor() {\n        this.config = CONFIG;\n        this.seql = new Sequelize(this.config);\n        this.modules = this.modules.concat(\n            MODULE_CLASSES\n        );\n        this.seql.addModels(this.modules);\n    }\n\n    public static get instance() {\n        return this._instance || (this._instance = new this());\n    }\n}\n",
    },
    {
        clase: 'index',
        ext: 'ts',
        direccion: '/app/ORM/modulo',
        contenido: "\n//aqui ir\u00E1n tus clases\nexport const MODULE_CLASSES: any[] = [];\n",
    },
    {
        clase: 'inicio.routes',
        ext: 'ts',
        direccion: '/app/routes/inicio',
        contenido: "\nimport express, { Response, Request } from 'express';\nexport const index_router = express.Router();\n\nindex_router.get('/index',(req:Request,res:Response)=>{\n    res.json('\u00A1\u00C9xito!');\n});\n",
    },
    {
        clase: 'init-routes.module',
        ext: 'ts',
        direccion: '/app/routes',
        contenido: "\n//parsers\nimport bodyParser from \"body-parser\";\nimport {index_router} from \"./inicio/inicio.routes\";\n//interfaces\nimport { Application, Request, Response } from 'express';\nconst routes = [\n    index_router\n];\nexport function bootstrapRoutes(app: Application) {\n    app.use(bodyParser.json()); // para application/json\n    app.use(bodyParser.urlencoded({ extended: true })); // para application/x-www-form-urlencoded\n    app.use(routes);\n\n    app.use('*', (req: Request, res: Response) => {\n        res.status(404).send();\n    });\n}        \n",
    },
    {
        clase: 'config.dev',
        ext: 'ts',
        direccion: '/config',
        contenido: "\n    export const config = {\n        PORT: process.env.PORT || 2405 \n    }\n    "
    },
    {
        clase: 'db.dev',
        ext: 'ts',
        direccion: '/config',
        contenido: "\n        import { ISequelizeConfig } from \"sequelize-typescript\";\nimport moment from 'moment-timezone';\nconst timezone = 'America/Mexico_City';\nconst momentTz = moment.tz.setDefault(timezone);\n\n// Configuracion de desarrollo\nexport const CONFIG: ISequelizeConfig = {\n    database: '',\n    username: '',\n    password: '',\n    host: '',\n    port: ,\n    dialect: '',\n    timezone: timezone,\n    pool: {\n        max: 10,\n        min: 1,\n        idle: 10000\n    },\n    logging: false\n}\n\n// Configuracion de PREPRODUCCION\n// export const CONFIG: ISequelizeConfig = {\n//     database: '',\n//     username: '',\n//     password: '',\n//     host: '',\n//     port: ,\n//     dialect: '',\n//     timezone: timezone,\n//     pool: {\n//         max: 10,\n//         min: 1,\n//         idle: 10000\n//     },\n//     logging: false\n// }\n\n// Configuracion de PRODUCCION\n// export const CONFIG: ISequelizeConfig = {\n//     database: '',\n//     username: '',\n//     password: '',\n//     host: '',\n//     port: ,\n//     dialect: '',\n//     timezone: ,\n//     pool: {\n//         max: 10,\n//         min: 1,\n//         idle: 10000\n//     },\n//     logging: false\n// }\n\n\n    "
    },
    {
        clase: 'ecosystem.config',
        ext: 'js',
        direccion: '',
        contenido: "\n        module.exports = {\n            apps: [{\n                name: \"" + gen_1.nombreProyecto + "\",\n                script: \"./deploy/app/server.js\",\n                watch: false,\n                env: {\n                    \"NODE_ENV\": \"production\",\n                    \"SECRET\": 123456789,\n                    \"PORT\": 3003\n                }\n            }\n            ]\n        }\n        "
    },
    {
        clase: 'tsconfig',
        ext: 'json',
        direccion: '',
        contenido: "\n        {\n            \"compilerOptions\": {\n              \"baseUrl\": \".\",\n              \"paths\": {\n                \"@actions/*\": [\n                    \"app/actions/*\"\n                  ],\n                  \"@helpers/*\": [\n                    \"app/helpers/*\"\n                  ],\n                  \"@middlewares/*\": [\n                    \"app/middlewares/*\"\n                  ],\n                  \"@orm/*\": [\n                    \"app/orm/*\"\n                  ],\n                  \"@routes/*\": [\n                    \"app/routes/*\"\n                  ],\n                  \"@test/*\": [\n                    \"app/test/*\"\n                  ],\n                  \"@util/*\": [\n                    \"app/util/*\"\n                  ],\n                \"*\": [\n                  \"types/*\"\n                ]\n              },\n              /* Basic Options */\n              \"target\": \"es6\", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */\n              \"module\": \"commonjs\", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */\n              // \"lib\": [],                             /* Specify library files to be included in the compilation. */\n              // \"allowJs\": true,                       /* Allow javascript files to be compiled. */  \n              // \"checkJs\": true,                       /* Report errors in .js files. */\n              // \"jsx\": \"preserve\",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */\n              // \"declaration\": true,                   /* Generates corresponding '.d.ts' file. */\n              // \"declarationMap\": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */\n              // \"sourceMap\": true,                     /* Generates corresponding '.map' file. */\n              // \"outFile\": \"./\",                       /* Concatenate and emit output to single file. */\n              // \"outDir\": \"./dist\", /* Redirect output structure to the directory. */\n              // \"outDir\": \"./deploy\", /*Version de produccion */\n              \"outDir\": \"./dev\", /*Version de desarrollo */\n              // \"rootDir\": \"./\",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */\n              // \"composite\": true,                     /* Enable project compilation */\n              // \"removeComments\": true,                /* Do not emit comments to output. */\n              // \"noEmit\": true,                        /* Do not emit outputs. */\n              // \"importHelpers\": true,                 /* Import emit helpers from 'tslib'. */\n              // \"downlevelIteration\": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */\n              // \"isolatedModules\": true,             .  /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */\n              /* Strict Type-Checking Options */\n              \"strict\": true, /* Enable all strict type-checking options. */\n              // \"noImplicitAny\": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */\n              // \"strictNullChecks\": true,              /* Enable strict null checks. */\n              // \"strictFunctionTypes\": true,           /* Enable strict checking of function types. */\n              // \"strictBindCallApply\": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */\n              \"strictPropertyInitialization\": false, /* Enable strict checking of property initialization in classes. */\n              // \"noImplicitThis\": true,                /* Raise error on 'this' expressions with an implied 'any' type. */\n              // \"alwaysStrict\": true,                  /* Parse in strict mode and emit \"use strict\" for each source file. */\n              /* Additional Checks */\n              // \"noUnusedLocals\": true,                /* Report errors on unused locals. */\n              // \"noUnusedParameters\": true,            /* Report errors on unused parameters. */\n              // \"noImplicitReturns\": true,             /* Report error when not all code paths in function return a value. */\n              // \"noFallthroughCasesInSwitch\": true,    /* Report errors for fallthrough cases in switch statement. */\n              /* Module Resolution Options */\n              // \"moduleResolution\": \"node\",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */\n              // \"baseUrl\": \"./\",                       /* Base directory to resolve non-absolute module names. */\n              // \"paths\": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */\n              // \"rootDirs\": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */\n              // \"typeRoots\": [],                       /* List of folders to include type definitions from. */\n              // \"types\": [],                           /* Type declaration files to be included in compilation. */\n              // \"allowSyntheticDefaultImports\": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */\n              \"esModuleInterop\": true, /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */\n              // \"preserveSymlinks\": true,              /* Do not resolve the real path of symlinks. */\n              /* Source Map Options */\n              // \"sourceRoot\": \"\",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */\n              // \"mapRoot\": \"\",                         /* Specify the location where debugger should locate map files instead of generated locations. */\n              // \"inlineSourceMap\": true,               /* Emit a single file with source maps instead of having a separate file. */\n              // \"inlineSources\": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */\n              /* Experimental Options */\n              \"experimentalDecorators\": true, /* Enables experimental support for ES7 decorators. */\n              \"emitDecoratorMetadata\": true, /* Enables experimental support for emitting type metadata for decorators. */\n            }\n          }\n        "
    },
    {
        clase: '',
        ext: 'gitignore',
        direccion: '',
        contenido: "\n# Modulos de node\nnode_modules\n\n# Directorio de distribuci\u00F3n\ndist\ndev\n# Directorio de pruebas\ndeploy\n# Archivo package-lock.json\n package-lock.json\n# Carpeta Creacion Imagenes (Ignorada para pruebas desarrollo)\nnoticias_imagenes_BD\npublic\ndeploy.json\n"
    }
];
