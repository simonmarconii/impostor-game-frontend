import { Component, inject } from '@angular/core';
import { User } from '../../service/user';
import { RouterLink } from "@angular/router";
import { Server } from '../../service/server';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userService = inject(User);
  serverService = inject(Server);
}
