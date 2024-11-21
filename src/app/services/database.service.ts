import { Injectable } from '@angular/core';
import { db, User, Message } from '../database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {}

  // Ajouter un utilisateur
  async addUser(user: User): Promise<number> {
    return await db.users.add(user);
  }

  // Récupérer tous les utilisateurs
  async getUsers(): Promise<User[]> {
    return await db.users.toArray();
  }

  // Ajouter un message
  async addMessage(message: Message): Promise<number> {
    return await db.messages.add(message);
  }

  // Récupérer tous les messages entre deux utilisateurs
  async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
    return await db.messages
        .where('sender')
        .equals(senderId)
        .filter((msg) => msg.receiver === receiverId)
        .toArray();
  }
}
