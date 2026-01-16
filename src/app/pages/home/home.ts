import { Component, inject, NgModule } from '@angular/core';
import { User } from '../../service/user';
import { RouterLink } from "@angular/router";
import { Server } from '../../service/server';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  userService = inject(User);
  serverService = inject(Server);
}
