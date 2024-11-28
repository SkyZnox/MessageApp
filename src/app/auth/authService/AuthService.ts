import {Injectable} from '@angular/core';
import {db, Group, User} from '../../database';
import {PromiseExtended} from "dexie";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'userSession';
  private loggedIn: boolean = false;

  constructor() {}

  async saveUser(user: User): Promise<{ success: boolean; message: string }> {
    const existingUser = await db.users.where('username').equals(user.username).first();

    if (existingUser) {
      return { success: false, message: 'The username already exists.' };
    }

    try {
      await db.users.add(user);
      return { success: true, message: 'User successfully registered !' };
    } catch (error) {
      console.error('User registration error:', error);
      return { success: false, message: 'An error occurred during registration.' };
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const user = await db.users
        .where('username')
        .equals(username)
        .and((u) => u.password === password)
        .first();

    console.log(user)
    return user || null;
  }

  saveUserSession(user: User) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.loggedIn = true;
  }

  getUserSession(): User | null {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  async getGroupsFromUserId(id: number): Promise<Group[] | null> {
    try {
      const groups = await db.group.toArray();

      const userGroups = groups.filter(group => group.usersId.includes(id));

      console.log(userGroups);
      return userGroups;
    } catch (error) {
      console.error('Error retrieving groups with user ID', error);
      return null;
    }
  }

  getGroupsFromHisId(groupId: number){
    try{
      const groups = db.group.where("usersId").equals([1,2,3]).toArray();
      console.log(groups)
      return groups
    } catch (error){
      console.error('Error retrieving groups with user ID', error);
      return null;
    }


  }

  async getUserById(userId: number) {
    try {
      const user = await db.users.get(userId);
      console.log(user)
      return user;
    } catch (error) {
      console.error('Error retrieving user by ID', error);
      return null;
    }
  }



  async getUsersWithConversations(loggedInUserId: number) {
    const messages = await db.messages.where('senderId').equals(loggedInUserId).toArray();
    const messages2 = await db.messages.where('receiverId').equals(loggedInUserId).toArray();

    let mess = messages.concat(messages2);
    const userIds = new Set<number>();

    mess.forEach((message) => {
      message.participants.forEach((participantId) => {
        if (participantId !== loggedInUserId) {
          userIds.add(participantId);
        }
      });
    });

    const usersWithConversations = [];
    for (const userId of userIds) {
      const user = await db.users.get(userId);
      if (user) {
        usersWithConversations.push(user);
      }
    }

    return usersWithConversations;
  }



  clearUserSession() {
    localStorage.removeItem(this.storageKey);
    this.loggedIn = false;
  }

  isUserLoggedIn(): boolean {
    return this.loggedIn || !!this.getUserSession();
  }
}
