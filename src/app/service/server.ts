import { inject, Injectable, signal, NgZone } from '@angular/core';
import { io } from 'socket.io-client';
import { User } from './user';
import { Router } from '@angular/router';
import { Player } from '../pages/impostor/impostor';
import { environment } from '../../environments/environment';

export type Room = {
  id: string;
  players: Player[];
  state: 'waiting' | 'in-game' | 'ended';
  footballer: string | null;
  popUp: boolean;
  isClose: boolean;
  startPlayer: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class Server {
  server = io(environment.SERVER_URL, {autoConnect: false});
  userService = inject(User);
  router = inject(Router);
  roomUpdate = signal<Room>({
    id: '', 
    players: [], 
    state: 'waiting', 
    footballer: null, 
    popUp: false, 
    isClose: false, 
    startPlayer: null,
  })

  constructor(private zone: NgZone) {
    this.server.on('connect', () => {
      console.log('Connected to back');
    });
    this.server.on("update-room", (room) => {
      console.log("Room updated:", room);
      this.zone.run(() => {
        this.roomUpdate.set(room);
      })
    });
    this.server.connect();
  }

  createRoom() {    
    this.server.emitWithAck("create-room", 
      {
        username: this.userService.username(), 
        img: this.userService.img()
      }).then(res => {
      this.router.navigate(['impostor', res.room.id]);
    });
  }

  joinRoom(id: string) {
    this.server.emitWithAck("join-room", 
      {
        username: this.userService.username(),
        img: this.userService.img(),
        id: id
      });
  }

  startGame(id: string) {
    this.server.emitWithAck("start-game", id);
  }

  stopGame(id: string) {
    this.server.emitWithAck("stop-game", id);
  }

  closeRoom(id: string) {
    this.server.emitWithAck("close-room", id);
  }

  disconnect(id: string) {
    this.server.emitWithAck("disconnect-player", {
      username: this.userService.username(),
      id: id,
    });
  }
}
