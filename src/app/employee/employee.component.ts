import { Component } from '@angular/core';
import { Employee } from '../../models/Employee';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { EMPLOYEES } from '../../constants/Employees';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';



@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    FormsModule,    // To use `ngModel`.
    NgFor,    // To use `*ngFor`.
    NgIf,    // To use `*ngIf`.
    EmployeeUpdateComponent    // Child component.
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})

export class EmployeeComponent {
  employeeList = EMPLOYEES;

  /** READ. */
  employeeRead?: Employee;

  /** READ. */
  readEmployee(employee: Employee): void {
    if (this.employeeRead == undefined) this.employeeRead = employee;
    else this.employeeRead = undefined;
  }

  /** UPDATE. */
  employeeUpdated?: Employee;

  /** UPDATE. */
  updateEmployee(employee: Employee): void {
    if (this.employeeUpdated == undefined) this.employeeUpdated = employee;
    else this.employeeUpdated = undefined;
  }

  /** Is `employeeList` sorted descending? */
  employeeListSorting: boolean | null = null;

  /** Sort the employees. */
  sortEmployeeList(keyword: string): void {
    const sorter = (a: string, b: string) =>
      sortString(a, b, this.employeeListSorting);
    switch (keyword) {
      case "username":
        this.employeeList
          .sort((n, o) => sorter(
            n.username,
            o.username
          ));
        break;
      case "name":
        this.employeeList.sort((n, o) => sorter(
          n.firstName + n.lastName,
          o.firstName + o.lastName
        ));
        break;
      case "email":
        this.employeeList.sort((n, o) => sorter(
          n.email,
          o.email
        ));
        break;
      default:
        break;;
    }
    if (this.employeeListSorting == null) this.employeeListSorting = false;
    else if (!this.employeeListSorting) this.employeeListSorting = true;
    else {
      this.employeeListSorting = null;
      this.employeeList.sort((n, o) => n.id - o.id)
    }
  }

  /** Query to filter the employee list. */
  employeeFiltered: Employee = {
    id: 0,
    firstName: "",
    username: '',
    lastName: '',
    email: '',
    birthDate: null,
    basicSalary: null,
    status: null,
    group: null,
    description: null
  }

  /** Filter the employee. */
  filterEmployeeList(query: Employee): Employee[] {
    return this.employeeList.filter(n =>
      n.username.toLowerCase().includes(query.username.toLowerCase()) && (
        n.firstName.toLowerCase().includes(query.firstName.toLowerCase())
        || n.lastName.toLowerCase().includes(query.firstName.toLowerCase())
      ) && n.email.toLowerCase().includes(query.email.toLowerCase())
    );
  }
}



/** Function to sort strings. */
function sortString(a: string, b: string, fromDescending: boolean | null): number {
  if (fromDescending == null) {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  } else if (fromDescending == false) {
    return a.toLowerCase() > b.toLowerCase() ? -1 : 1;
  } else return 0;
}