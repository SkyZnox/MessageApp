import {Component, OnInit} from '@angular/core';
import {db, Message} from "../database";
import {AuthService} from "../auth/authService/AuthService";

@Component({
  selector: 'app-groups',
  imports: [],
  templateUrl: './groups.component.html',
  standalone: true,
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {


  constructor(
      private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  async loadGroups(){
    const loggedInUser = this.authService.getUserSession();


    if (loggedInUser) {

      // const groups = this.authService.getGroupsFromUserId(loggedInUser.id!);
      const groups = this.authService.getGroupsFromHisId(1);
      console.log(`deuxième groupe : ${{groups}}`);

    }
  }

}