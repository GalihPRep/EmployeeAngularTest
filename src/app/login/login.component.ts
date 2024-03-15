import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../models/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRejected = false;
  login(input: Login) {
    if (input.username == "a" && input.password == "a") {
      this.loginAfter.emit(true);
    } else this.loginRejected = true;
  }
  loginBefore: Login = {
    username: '',
    password: ''
  }
  @Output() loginAfter = new EventEmitter<boolean>;
}
