import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../service/user';

@Component({
  selector: 'app-change-username',
  imports: [RouterModule, FormsModule],
  templateUrl: './change-username.html',
  styleUrl: './change-username.css',
})
export class ChangeUsername {
  userService = inject(User);
  router = inject(Router);

  changeName(newUsername: string) {
    this.userService.username.set(newUsername);
    this.router.navigate(['/']);
  }
}
