import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from './authService/AuthService'; // Importer le Router

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  url: string = 'assets/authFiles/login.json';
  jsonData: any = [];
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
    const user = this.jsonData.find(
      (user: any) =>
        user.login === this.username && user.password === this.password
    );

    if (user) {
      this.errorMessage = '';
      console.log('Authentification réussie pour :', user);

      this.authService.saveUserSession(user);

      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Username or password incorrect';
      alert(this.errorMessage);
    }
  }

  test(){
    return this.authService.isUserLoggedIn();
  }
}
