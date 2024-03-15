import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** 
 * This is the imported `EmployeeComponent`. 
 * Without importing this you can't use the `<app-employee>` tag in your
 * `app.component.html`.
 */
import { EmployeeComponent } from "./employee/employee.component";
import { LoginComponent } from './login/login.component';
import { NgIf } from '@angular/common';

/**
 * Put `EmployeeComponent` here.
 */
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, EmployeeComponent, LoginComponent, NgIf]
})

export class AppComponent {
  title = 'Employee list';
  isLoggedIn = false;
  login(): void { this.isLoggedIn = true; }
  logout(): void { this.isLoggedIn = false; }
}
