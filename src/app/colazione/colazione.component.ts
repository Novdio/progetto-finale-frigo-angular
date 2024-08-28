import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-colazione',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './colazione.component.html',
  styleUrl: './colazione.component.css'
})
export class ColazioneComponent implements OnInit {
  constructor(){}
  @Input()day!:number;

  modalName!:string;
  
  ngOnInit(): void {
      this.modalName='colazioneConfirm'+this.day;
  }
  isEditing: boolean = false;

  // Funzione per abilitare la modalità di modifica.
  enableEditing() {
    this.isEditing = true;
  }

  // Funzione per disabilitare la modalità di modifica.
  disableEditing() {
    this.isEditing = false;
  }

  openModal() {
    const modal = document.getElementById(this.modalName);
    if (modal) {
      modal.style.display = 'block';
      document.body.classList.add('overflow-y-hidden');
    }
  }

  closeModal() {
    const modal = document.getElementById(this.modalName);
    if (modal) {
      modal.style.display = 'none';
      document.body.classList.remove('overflow-y-hidden');
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscPressed(event: KeyboardEvent) {
    this.closeAllModals();
  }

  closeAllModals() {
    const modals = document.getElementsByClassName('modal');
    Array.prototype.slice.call(modals).forEach((modal: HTMLElement) => {
      modal.style.display = 'none';
    });
    document.body.classList.remove('overflow-y-hidden');
  }
}
