import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IaService } from '../services/ia.service';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IaRequest } from '../model/IaRequest';
@Component({
  selector: 'app-frigo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './frigo.component.html',
  styleUrl: './frigo.component.css',
})
export class FrigoComponent {
  ricetta: string = '';
  ricette: IaRequest = { question: '' };
  ingrediente1: string = '';
  ingrediente2: string = '';
  ingrediente3: string = '';
  ingrediente4: string = '';

  disabled: boolean = false;

  constructor(private ia: IaService) {}

  //ricetta casuale
  ricettaRandom() {
    this.ia.getConsigliaRicetta().subscribe((resp) => (this.ricetta = resp[0]));
  }

  //ricetta ingredienti
  ricettaRequest() {
    let ingredienti: string =
      this.ingrediente1 +
      ', ' +
      this.ingrediente2 +
      ', ' +
      this.ingrediente3 +
      ', ' +
      this.ingrediente4;
    this.disabled = true;
    this.ia.sendRicettaRequest(ingredienti).subscribe({
      next: (resp) => {
        this.ricette = resp;
        this.disabled = false;
      },

      error: (err) => {
        let errore = err.error;
        this.disabled = false;
        alert(errore);
      },
    });
  }
}
