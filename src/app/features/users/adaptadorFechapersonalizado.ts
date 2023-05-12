import { NativeDateAdapter } from "@angular/material/core";
import { Injectable } from "@angular/core";
import { format, parseISO, formatISO } from "date-fns";
import { isValid, parse } from 'date-fns';
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string') {
        // Try parsing as ISO first. If that fails, try 'dd/MM/yyyy'.
        let date = parseISO(value);
        if (!isValid(date)) {
            date = parse(value, 'dd/MM/yyyy', new Date());
        }
        if (isValid(date)) {
            return date;
        }
    } else if (value instanceof Date) {
        return value;
    }
    return null;
}

    override format(date: Date, displayFormat: Object): string {
        return format(date, 'dd/MM/yyyy');
    }

    fromModel(value: string | null): Date | null {
        if (value) {
            return parseISO(value);
        }
        return null;
    }

    toModel(date: Date | null): string | null {
        if (date) {
            return formatISO(date, { representation: 'date' });
        }
        return null;
    }
}
