export interface Employee {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date|null;
    basicSalary: number|null;
    status: string;
    group: string;
    description: Date|null;
}