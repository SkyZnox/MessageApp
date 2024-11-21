import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'userSession'; // Clé pour LocalStorage
  private loggedIn: boolean = false;


  constructor() {
  }

  // Enregistrer un utilisateur dans le stockage
  saveUserSession(user: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  // Obtenir l'utilisateur stocké
  getUserSession() {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  // Supprimer la session utilisateur
  clearUserSession() {
    localStorage.removeItem(this.storageKey);
  }


  isUserLoggedIn() {
    return this.loggedIn;
  }
}
