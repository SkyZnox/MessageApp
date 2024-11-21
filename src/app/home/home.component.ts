import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/authService/AuthService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUserSession();

    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    console.log("test")
    this.authService.clearUserSession();
    this.router.navigate(['/login']);
  }
}
