"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ThrowError(error) {
    var err = 'ERROR => ' + error;
    console.log(err);
}
exports.ThrowError = ThrowError;
/**
 * Quitar guiones bajos al nombre de la clase, si no tiene guiones retorna
 * el mismo nombre
 * @param nombre Nombre a estilizar
 */
function EstilizarNombreClase(nombre) {
    var USPos = nombre.indexOf('_');
    if (USPos >= 0) {
        var temp = nombre.replace('_', '');
        temp = temp[0].toUpperCase() + temp.slice(1, USPos) + temp[USPos].toUpperCase() + temp.slice(USPos + 1, temp.length);
        return temp;
    }
    return nombre;
}
exports.EstilizarNombreClase = EstilizarNombreClase;
