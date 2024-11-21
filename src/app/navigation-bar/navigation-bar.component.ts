import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../auth/authService/AuthService';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent{
  constructor(private authService: AuthService, private router: Router) {}


  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isSignInPage(): boolean {
    return this.router.url === '/signin';
  }

  logout() {
    this.authService.clearUserSession();
    this.router.navigate(['/login']);
  }
}
