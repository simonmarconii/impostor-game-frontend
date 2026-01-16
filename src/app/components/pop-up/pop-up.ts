import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";

@Component({
  selector: 'app-pop-up',
  imports: [CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css',
})
export class PopUp {
  @Input() isOpen: boolean = false; 
  @Input() title: string = '';
  @Input() titleStyle: string = '';
  @Output() closePopUp = new EventEmitter<void>();
  
  close() {
    this.closePopUp.emit();
  }
}
