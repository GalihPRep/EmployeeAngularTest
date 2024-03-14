import { Employee } from "../models/Employee";

export function checkEmployeeFields(employee: Employee): boolean {
    const mapped = Object.entries(employee).map(n => [n[0], String(n[1])]);
    return mapped.every(n => n[1].length >= 2);
}