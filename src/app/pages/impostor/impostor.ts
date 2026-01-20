import { Component, inject, input } from '@angular/core';
import { Server } from '../../service/server';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PopUp } from '../../components/pop-up/pop-up';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';
import { Background } from "../../components/background/background";

export type Player = {
  username: string;
  img: string;
  impostor: boolean;
}

@Component({
  selector: 'app-impostor',
  imports: [CommonModule, MatCardModule, MatButtonModule, PopUp, MatIconModule, RouterModule, Background],
  templateUrl: './impostor.html',
  styleUrl: './impostor.css',
})
export class Impostor {
  id = input<string>();
  serverService = inject(Server);
  room = this.serverService.roomUpdate;
  url: string = '';
  shortUrl: string = '';
  isPopUpOpen = this.room().popUp;
  isClose: boolean = false;

  constructor() {
    this.url = window.location.href;
    this.shortUrl = this.url.slice(0, 35) + '...';
  }

  ngOnInit() {
    this.serverService.joinRoom(this.id()!);
  }

  canStartGame() {
    return (
      this.serverService.userService.username() === this.room().players[0]?.username && 
      this.room().state === 'waiting' //&& this.players().length >= 3;
    )
  }

  canStopGame() {
    return (
      this.serverService.userService.username() === this.room().players[0]?.username && 
      this.room().state === 'in-game'
    )
  }

  canCloseRoom() {
    return (
      this.serverService.userService.username() === this.room().players[0]?.username && 
      this.room().state === 'waiting'
    )
  }

  isInGame() {
    return (
      this.room().state === 'in-game'
    )
  }

  startGame() {
    this.openPopUp();
    this.serverService.startGame(this.id()!);
  }

  stopGame() {
    this.closePopUp();
    this.serverService.stopGame(this.id()!);
  }

  closeRoom() {
    this.serverService.closeRoom(this.id()!);
  }

  disconnect() {
    if(this.serverService.userService.username() === this.room().players[0]?.username) {
      this.closeRoom();
    }else {
      this.serverService.disconnect(this.id()!);
    }
  }

  impostor() {
    return this.room().players.some(player =>
      player.username === this.serverService.userService.username() &&
      player.impostor === true
    );
  }

  openPopUp() {
    this.isPopUpOpen = true;
  }

  closePopUp() {
    this.isPopUpOpen = false;
  }

  titleChange(): string {
    if(this.impostor()) {
      return "Impostor";
    }else{
      return this.room().footballer!;
    }
  }

  titleStyle(): string {
    if(this.impostor()) {
      return "text-red-500 text-5xl";
    }else {
      return 'text-3xl';
    }
  }

  copyUrl() {
    navigator.clipboard.writeText(this.url);
  }
}
