import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {
  @Input() employeeBefore?: Employee;
  @Output() employeeAfter: EventEmitter<Employee> =
    new EventEmitter<Employee>();

  /** UPDATE. */
  updateEmployee(employee: Employee | undefined): void {
    if (this.employeeBefore == undefined) this.employeeBefore = employee;
    else {
      this.employeeBefore = undefined;
      this.employeeAfter.emit(undefined);
    }
  }
}
