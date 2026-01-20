import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-background',
  imports: [MatIconModule, RouterModule],
  templateUrl: './background.html',
  styleUrl: './background.css',
})
export class Background {
  @Input() url: string = ''; 
  @Output() disconnectPlayer = new EventEmitter<void>();
  
  disconnect() {
    this.disconnectPlayer.emit();
  }
}
