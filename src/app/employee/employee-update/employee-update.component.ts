import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DEPARTMENTS } from '../../../constants/Departments';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {
  departmentList: String[] = DEPARTMENTS;
  @Input() employeeBefore?: Employee;
  @Output() employeeAfter: EventEmitter<Employee> =
    new EventEmitter<Employee>();

  /** UPDATE. */
  employeeUpdatedAlert = true;
  updateEmployeeBegins() { this.employeeUpdatedAlert = false; }
  updateEmployee(employee: Employee | undefined): void {
    if (this.employeeBefore == undefined) this.employeeBefore = employee;
    else {
      this.employeeBefore = undefined;
      this.employeeAfter.emit(undefined);
    }
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
        : !isNaN(parseFloat(string));
  }
}
