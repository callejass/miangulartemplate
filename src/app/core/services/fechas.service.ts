import { Injectable } from "@angular/core";
import { format, parse } from "date-fns";

@Injectable({
  providedIn: "root",
})
export class FechasService {
  formateoDeFecha(fecha: Date): string {
    if (fecha) {
      const formattedDate = format(fecha, "yyyy-MM-dd");
      return formattedDate;
    } else return "";
  }
  constructor() {}
}
