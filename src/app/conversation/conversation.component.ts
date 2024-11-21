import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {db, Message, User} from '../database';
import {AuthService} from "../auth/authService/AuthService";
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server"; // Importez les modèles nécessaires

@Component({
  selector: 'app-conversation',
  standalone: true,
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  imports: [
    DatePipe,
    FormsModule
  ]
})
export class ConversationComponent implements OnInit {
  userId: number = 0;
  userTexted: any
  messages: Message[] = [];
  messageText: string = '';

  constructor(
      private route: ActivatedRoute,
      private authService: AuthService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.userId = +params.get('userId')!;

      this.userTexted = await this.authService.getUserById(this.userId);

      await this.loadMessages();
    });
  }

  async loadMessages() {
    const loggedInUser = this.authService.getUserSession();

    if (loggedInUser) {
      const allMessages = await db.messages.toArray();

      this.messages = allMessages.filter((message) => {
        const participants = message.participants;

        return (
            participants.includes(loggedInUser.id!) &&
            participants.includes(this.userId)
        );
      });

      this.messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }
  }


  async sendMessage() {
    const loggedInUser = this.authService.getUserSession();

    if (loggedInUser && this.messageText.trim()) {

      const newMessage: Message = {
        participants: [loggedInUser.id!, this.userId],
        text: this.messageText,
        senderId: loggedInUser.id!,
        receiverId: this.userId,
        timestamp: new Date()
      };

      await db.messages.add(newMessage);

      this.messageText = '';

      await this.loadMessages();
    }
  }
}
