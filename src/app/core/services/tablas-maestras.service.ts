import { Injectable } from "@angular/core";
import { Provincia, Rol } from "src/app/features/users/models/user.model";

export const ROLES: Rol[] = [
  { codigo: "1", nombre: 'Administrador' },
  { codigo: "2", nombre: 'Directivo' },
  { codigo: "3", nombre: 'Redactor' },
  { codigo: "4", nombre: 'Colaborador' },
  { codigo: "5", nombre: 'Usuario' },
  { codigo: "6", nombre: 'Usuario Vip' },
  { codigo: "7", nombre: 'Invitado' },
];
const PROVINCIAS: Provincia[] = [
  { codigo: "1", nombre: "Álava" },
  { codigo: "2", nombre: "Albacete" },
  { codigo: "3", nombre: "Alicante" },
  { codigo: "4", nombre: "Almería" },
  { codigo: "33", nombre: "Asturias" },
  { codigo: "5", nombre: "Ávila" },
  { codigo: "6", nombre: "Badajoz" },
  { codigo: "7", nombre: "Baleares" },
  { codigo: "8", nombre: "Barcelona" },
  { codigo: "9", nombre: "Burgos" },
  { codigo: "10", nombre: "Cáceres" },
  { codigo: "11", nombre: "Cádiz" },
  { codigo: "39", nombre: "Cantabria" },
  { codigo: "12", nombre: "Castellón" },
  { codigo: "13", nombre: "Ciudad Real" },
  { codigo: "14", nombre: "Córdoba" },
  { codigo: "15", nombre: "A Coruña" },
  { codigo: "16", nombre: "Cuenca" },
  { codigo: "20", nombre: "Gipuzkoa" },
  { codigo: "17", nombre: "Gerona" },
  { codigo: "18", nombre: "Granada" },
  { codigo: "19", nombre: "Guadalajara" },
  { codigo: "21", nombre: "Huelva" },
  { codigo: "22", nombre: "Huesca" },
  { codigo: "23", nombre: "Jaén" },
  { codigo: "24", nombre: "León" },
  { codigo: "25", nombre: "Lérida" },
  { codigo: "27", nombre: "Lugo" },
  { codigo: "28", nombre: "Madrid" },
  { codigo: "29", nombre: "Málaga" },
  { codigo: "30", nombre: "Murcia" },
  { codigo: "31", nombre: "Navarra" },
  { codigo: "32", nombre: "Orense" },
  { codigo: "34", nombre: "Palencia" },
  { codigo: "35", nombre: "Las Palmas" },
  { codigo: "36", nombre: "Pontevedra" },
  { codigo: "26", nombre: "La Rioja" },
  { codigo: "37", nombre: "Salamanca" },
  { codigo: "38", nombre: "Santa Cruz de Tenerife" },
  { codigo: "40", nombre: "Segovia" },
  { codigo: "41", nombre: "Sevilla" },
  { codigo: "42", nombre: "Soria" },
  { codigo: "43", nombre: "Tarragona" },
  { codigo: "44", nombre: "Teruel" },
  { codigo: "45", nombre: "Toledo" },
  { codigo: "46", nombre: "Valencia" },
  { codigo: "47", nombre: "Valladolid" },
  { codigo: "48", nombre: "Vizcaya" },
  { codigo: "49", nombre: "Zamora" },
  { codigo: "50", nombre:"Zaragoza"}
]

@Injectable({
  providedIn: "root",
})
export class TablasMaestrasService {
  constructor() {}
  getProvincias():Provincia[]{
    return PROVINCIAS;
  }
  getRoles():Rol[]{
    return ROLES
  }
}
