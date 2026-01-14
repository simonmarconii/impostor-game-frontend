import { Component, inject, input, signal } from '@angular/core';
import { Room, Server } from '../../service/server';
import { CommonModule } from '@angular/common';

export type Player = {
  username: string;
  impostor: boolean;
}

@Component({
  selector: 'app-impostor',
  imports: [CommonModule],
  templateUrl: './impostor.html',
  styleUrl: './impostor.css',
})
export class Impostor {
  id = input<string>();
  serverService = inject(Server);
  room = this.serverService.roomUpdate;

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

  isInGame() {
    return (
      this.room().state === 'in-game'
    )
  }

  startGame() {
    this.serverService.startGame(this.id()!);
  }

  stopGame() {
    this.serverService.stopGame(this.id()!);
  }

  impostor() {
    return this.room().players.some(player =>
      player.username === this.serverService.userService.username() &&
      player.impostor === true
    );
  }
}
