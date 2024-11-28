import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../auth/authService/AuthService';

@Component({
  selector: 'app-sign-in',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sign-in.component.html',
  standalone: true,
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  name: string = '';
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      await this.router.navigate(['/home']);
    }
  }

  async onSubmit() {
    const result = await this.authService.saveUser({
      name: this.name,
      username: this.username,
      password: this.password,
      groupsId: []
    });

    this.message = result.message;
    console.log(this.message)

    if (result.success) {
      this.name = '';
      this.username = '';
      this.password = '';
      alert("Successful authentication")
      await this.router.navigate(['/login']);
    }

  }
}
