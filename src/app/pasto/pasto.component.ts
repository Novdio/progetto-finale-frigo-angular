import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meal } from '../model/Meal';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pasto',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './pasto.component.html',
  styleUrl: './pasto.component.css'
})
export class PastoComponent implements OnInit {
  constructor(private http:HttpClient){}
  @Input()meal!:Meal;
  pasti:string[] = []
  modalName!:string;
  
  ngOnInit(): void {;
    this.pasti = [...this.meal.pasti]
      for(let i = this.pasti.length; i<4; i++) this.pasti.push("");
      this.modalName=this.meal.meal+this.meal.id;
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

  save(){
    this.meal.checked = true;
    this.meal.pasti = this.pasti;
    this.http.put("/api/meal/"+this.meal.id,this.meal).subscribe(resp => this.closeModal());
  }
}
