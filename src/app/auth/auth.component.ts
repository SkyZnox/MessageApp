import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from "./authService/AuthService";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      await this.router.navigate(['/home']);
    }
  }

  async onSubmit() {
    const user = await this.authService.authenticate(this.username, this.password);

    if (user) {
      this.errorMessage = '';
      console.log('Successful authentication for :', user);

      this.authService.saveUserSession(user);

      await this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Incorrect username or password';
      alert(this.errorMessage);
    }
  }
}
