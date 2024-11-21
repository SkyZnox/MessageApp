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
  url: string = 'assets/authFiles/login.json';
  jsonData: any = [];
  name: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    try {
      const response = await fetch(this.url);
      this.jsonData = await response.json();
    } catch (error) {
      console.error('Erreur lors du chargement du fichier JSON', error);
    }
    if (this.authService.isUserLoggedIn()) {
      await this.router.navigate(['/home']);
    }
  }

  onSubmit() {

    // CHANGE LOGIC, SEARCH IF THE USER DOESNT EXIST. IF NOT SAVE DATA IN JSON AND REDIRECT TO LOGIN
    const user = this.jsonData.find(
      (user: any) =>
        user.login === this.username
    );

    if (user) {
      this.errorMessage = 'User already exists';
      alert(this.errorMessage);
    } else {


      this.router.navigate(['/login']);

    }
  }
}
