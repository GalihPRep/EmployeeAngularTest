import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** 
 * This is the imported `EmployeeComponent`. 
 * Without importing this you can't use the `<app-employee>` tag in your
 * `app.component.html`.
 */
import { EmployeeComponent } from "./employee/employee.component";

/**
 * Put `EmployeeComponent` here.
 */
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, EmployeeComponent]
})

/** This class will be imported into `src/main.ts`. */
export class AppComponent {
  /** This will appears in the main page. */
  title = 'Employee list';
}
