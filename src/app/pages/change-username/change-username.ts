import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../service/user';
import { MatAnchor, MatIconButton } from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-username',
  imports: [RouterModule, FormsModule, MatAnchor, MatInputModule, MatIconModule, MatIconButton, MatButtonToggleModule, CommonModule],
  templateUrl: './change-username.html',
  styleUrl: './change-username.css',
})
export class ChangeUsername {
  userService = inject(User);
  router = inject(Router);

  avatars = ['Felix', 'Jude', 'Leo', 'Luis', 'Jameson', 'Alexander'];
  selectedAvatar: string = 'Felix';
  
  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  changeName(newUsername: string, avatar: string) {
    this.userService.username.set(newUsername);
    this.userService.img.set(avatar);
    this.router.navigate(['/']);
  }
}
