export interface Employee {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date|null;
    basicSalary: number|null;
    status: string|null;
    group: string|null;
    description: Date|null;
}