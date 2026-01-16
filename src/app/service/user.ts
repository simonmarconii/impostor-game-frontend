import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  constructor() {
    const storedName = localStorage.getItem('username');
    const storedImg = localStorage.getItem('img');
    if(storedName) {
      this.username.set(storedName);
    }
    if(storedImg) {
      this.img.set(storedImg);
    }
  }

  username = signal<string>("");
  img = signal<string>("Felix");

  saveNameInLocalStorage = effect(() => localStorage.setItem('username', this.username()));
  saveImgInLocalStorage = effect(() => localStorage.setItem('img', this.img()));
}
