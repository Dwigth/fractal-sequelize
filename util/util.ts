export function ThrowError(error: string): void {
    let err = 'ERROR => ' + error;
    console.log(err);
}
/**
 * Quitar guiones bajos al nombre de la clase, si no tiene guiones retorna 
 * el mismo nombre
 * @param nombre Nombre a estilizar
 */
export function EstilizarNombreClase(nombre: string) {
    let USPos = nombre.indexOf('_');
    if (USPos >= 0) {
        let temp = nombre.replace('_', '');
        temp = temp[0].toUpperCase() + temp.slice(1, USPos) + temp[USPos].toUpperCase() + temp.slice(USPos + 1, temp.length);
        return temp;
    }
    return nombre;
}