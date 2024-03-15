import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-read',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './employee-read.component.html',
  styleUrl: './employee-read.component.css'
})
export class EmployeeReadComponent {
  @Input() employeeRead?: Employee;
  @Output() employeeUnread = new EventEmitter<Employee>;
  unreadEmployee(): void {
    this.employeeUnread.emit(this.employeeRead);
    this.employeeRead = undefined;
  }

  toDate(date: Date | undefined | null): string | undefined {
    const dateRaw = date == null ? "" : date?.toLocaleDateString().split("/");
    const dateDay = dateRaw[0] + (
      parseInt(dateRaw[0]) == 1
        ? "st"
        : parseInt(dateRaw[0]) == 2
          ? "nd"
          : parseInt(dateRaw[0]) == 3
            ? "rd"
            : "th"
    );
    const dateMonth = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ][parseInt(dateRaw[1]) - 1];
    return `${dateMonth} ${dateDay} ${dateRaw[2]}`;
  }

  toCurrency(value: number | undefined | null): string {
    return value == null ? "" : (new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })).format(value);
  }
}
