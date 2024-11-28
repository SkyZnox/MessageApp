import { Injectable } from '@angular/core';
import { db, User, Message } from '../database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {}

  async addUser(user: User): Promise<number> {
    return await db.users.add(user);
  }

  async getUsers(): Promise<User[]> {
    return await db.users.toArray();
  }

  async addMessage(message: Message): Promise<number> {
    return await db.messages.add(message);
  }

  async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
    return db.messages
        .where('sender')
        .equals(senderId)
        .filter((msg) => msg.receiverId === receiverId)
        .toArray();
  }
}
