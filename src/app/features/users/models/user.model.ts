export interface User{
    id:string;
    nombre:string;
    email:string;
    fechaNacimiento:string //yyyy-MM-DD
    provincia:string;
    roles:string[];
    
}
export interface Provincia{
    codigo:string;
    nombre:string;
}
export interface Rol {
    codigo: string;
    nombre: string;
}