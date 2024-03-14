import { Component, Input } from '@angular/core';
import { Employee } from '../../../models/Employee';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {
  @Input() employeeUpdated?: Employee;
  
}
