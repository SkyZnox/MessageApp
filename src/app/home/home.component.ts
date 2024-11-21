import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/authService/AuthService';
import {db, User} from "../database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  user: any = null;
  usersWithConversations: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.user = this.authService.getUserSession();

    if (!this.user) {
      this.router.navigate(['/login']);
    } else {

      const allUsers = await db.users.toArray();

      this.users = allUsers.filter((user) => this.user.id !== user.id);

      this.usersWithConversations = await this.authService.getUsersWithConversations(this.user.id);
    }
  }






  startConversation(user: User) {
    this.router.navigate(['/conversation', user.id]);
  }

}
