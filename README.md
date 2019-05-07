# fractal-sequelize-template

Esta estructura de directorio se basa en la arquitectura fractal por su patrón repetitivo. 
Creada para poder organizar y escalar API's utilizando tecnologías como Typescript, sequelize, sequelize-typescript.

# Directorio

| Directorio|Propósito |
|--|--|
| app | Será el contenedor de toda la aplicación |
|docs | Aquí se almacenará toda la documentación |
|assets| Recursos extras de la aplicación imagenes, archivos externos, etc |
|deploy| Compilado más estable |
|dev | Compilado de desarrollo|
|migrations| Migraciones para manejar los cambios en la base de datos. Más info [aqui](http://docs.sequelizejs.com/manual/migrations.html): |
|test| Pruebas unitarias|
|config| Archivos de configuración, API Keys, etc|

> Estructura del directorio **app**

|Directorio|Propósito|
|--|--|
|actions|Subdirectorio por módulo, guarda las entidades y/o clases|
|helpers|Subdirectorio por módulo guarda las interfaces y/o archivos de ayuda|
|middlewares|Subdirectorio por módulo, guarda todos los middlewares (express) del sistema|
|orm|Subdirectorio por módulo, este directorio guarda todas las clases de [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript)|
|routes|Subdirectorio por módulo, guarda todas las rutas de los módulos de la API|
|util|Archivos de utilidad general|