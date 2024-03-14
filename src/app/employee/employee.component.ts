import { Component } from '@angular/core';
import { Employee } from '../../models/Employee';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { EMPLOYEES } from '../../constants/Employees';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';



@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    FormsModule,    // To use `ngModel`.
    NgFor,    // To use `*ngFor`.
    NgIf,    // To use `*ngIf`.
    EmployeeUpdateComponent,    // Child component.
    EmployeeCreateComponent    // Child component.
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})

export class EmployeeComponent {
  employeeList = EMPLOYEES;

  /** CREATE. */
  employeeCreated: boolean = false;

  /** CREATE. */
  createEmployeeBegins() {
    this.employeeCreated = true;
  }

  /** CREATE. */
  createEmployee(employee: Employee | null): void {
    if (employee != null) {
      employee.id = this.employeeList.length + 1;
      this.employeeList.push(employee);
    }
    this.employeeCreated = false;
  }

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

  /** DELETE. */
  employeeDeleted?: Employee;

  /** Is `employeeList` sorted descending? */
  employeeListSorting: boolean | null = null;

  /** Sort the employees. */
  sortEmployeeList(keyword: string): void {
    const sorter = (a: string, b: string) => sortString(a, b, this.employeeListSorting);
    switch (keyword) {
      case "username":
        this.employeeList.sort((n, o) => sorter(n.username, o.username));
        break;
      case "name":
        this.employeeList.sort((n, o) => sorter(
          n.firstName + n.lastName,
          o.firstName + o.lastName
        ));
        break;
      case "email":
        this.employeeList.sort((n, o) => sorter(n.email, o.email));
        break;
      case "status":
        this.employeeList.sort((n, o) => sorter(n.status, o.status));
        break;
      case "group":
        this.employeeList.sort((n, o) => sorter(n.group, o.group));
        break;
      default:
        break;
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
    status: '',
    group: '',
    description: null
  }

  /** Filter the employee. */
  filterEmployeeList(query: Employee): Employee[] {
    const result = this.employeeList.filter(n =>
      n.username.toLowerCase().includes(query.username.toLowerCase())
      && (
        n.firstName.toLowerCase().includes(query.firstName.toLowerCase())
        || n.lastName.toLowerCase().includes(query.firstName.toLowerCase())
      )
      && n.email.toLowerCase().includes(query.email.toLowerCase())
      && n.status.toLowerCase().includes(query.status.toLowerCase())
      && n.group.toLowerCase().includes(query.group.toLowerCase())
    );
    // this.setPageSize(6);
    this.lastPage = Math.ceil(Math.max(1, result.length) / this.expectedPageSize);
    this.currentPage = Math.min(this.currentPage, this.lastPage);
    return result;
  }

  /** Current page! */
  currentPage = 1;

  /** Pages! */
  lastPage = 1;

  /** Size */
  expectedPageSize = 10;

  /** For page buttons */
  pageNumberList(): number[] {
    return Array.from({ length: this.lastPage }, (_, i) => i + 1);
  }

  /** Divide the employee list into pages. */
  pageEmployeeList(query: Employee): Employee[] {
    const result = this.filterEmployeeList(query);
    const firstIndex = (this.currentPage - 1) * this.expectedPageSize;
    const actualSize = this.lastPage * this.expectedPageSize - firstIndex;
    return result.slice(
      firstIndex,
      firstIndex + Math.min(this.expectedPageSize, actualSize)
    );
  }

  toPreviousPage(first: boolean = false): void {
    if (this.currentPage > 1) {
      if (first) this.currentPage = 1;
      else this.currentPage -= 1;
    }
  }

  toPage(number: number): void {
    this.currentPage = number;
  }

  toNextPage(last: boolean = false): void {
    if (this.currentPage < this.lastPage) {
      if (last) this.currentPage = this.lastPage;
      else this.currentPage += 1;
    }
  }

  

  setPageSize(size: number): void {
    this.expectedPageSize = size;
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