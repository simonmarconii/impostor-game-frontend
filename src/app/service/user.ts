import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor() {
    const storedName = localStorage.getItem('username');
    if(storedName) {
      this.username.set(storedName);
    }
  }

  username = signal<string>("");

  saveNameInLocalStorage = effect(() => localStorage.setItem('username', this.username()));
}
