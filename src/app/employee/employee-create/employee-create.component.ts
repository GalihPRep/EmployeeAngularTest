import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { checkEmployeeFields } from '../../../constants/EmployeesUtilities';
import { DEPARTMENTS } from '../../../constants/Departments';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgSelectModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {
  setDepartment(name: string) { this.employeeBefore.group = name; }
  getDepartmentList(): string[] {
    return DEPARTMENTS.filter(n => 
      n.toLowerCase().includes(this.employeeBefore.group.toLowerCase())
    );
  }
  unsetDepartment() {
    this.employeeBefore.group = ""
  }
  


  @Input() isEmployeeBeingCreated?: boolean;

  /** New employee! */
  employeeBefore: Employee = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: null,
    basicSalary: null,
    status: '',
    group: '',
    description: null
  }

  /** New employee! */
  @Output() employeeAfter: EventEmitter<Employee | null> =
    new EventEmitter<Employee | null>();

  /** Send the new employee! */
  createEmployee(employee: Employee | null): void {
    this.employeeAfter.emit(employee);
    this.isEmployeeBeingCreated = false;
  }




  isNotEmpty(data: string): boolean {
    return data.length >= 1;
  }

  isEmail(email: string): boolean {
    return email.indexOf('@') > 0
      && email.indexOf('@') == email.lastIndexOf('@')
      && email.lastIndexOf('.') < email.length - 1
      && email.indexOf('@') < email.lastIndexOf('.');
  }

  isNotTomorrow(date: Date | null = null): boolean {
    return date == null
      ? false
      : new Date(date).getTime() <= Date.now();
  }

  isNumber(string: number | null | string): boolean {
    return string == null
      ? false
      : typeof (string) == "number"
        ? true
        : /^\d+$/.test(string);
  }
}
