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
  ricetta2: string = '';
  ricetta3: string = '';
  ricetta4: string = '';
  ricette2: IaRequest = { question: '' };
  ricette: IaRequest = { question: '' };
  ricette3: IaRequest = { question: '' };
  ricette4: IaRequest = { question: '' };
  ingrediente1: string = '';
  ingrediente2: string = '';
  ingrediente3: string = '';
  ingrediente4: string = '';
  ingrediente5: string = '';
  ingrediente6: string = '';

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
      next: (resp1) => {
        this.ricette = resp1;
        this.disabled = false;

        this.ia.sendSecondaRicettaRequest(ingredienti).subscribe({
          next: (resp2) => {
            this.ricette2 = resp2;

            this.ia.sendTerzaRicettaRequest(ingredienti).subscribe({
              next: (resp3) => {
                this.ricette3 = resp3;

                this.ia.sendQuartaRicettaRequest(ingredienti).subscribe({
                  next: (resp4) => {
                    this.ricette4 = resp4;
                    this.saveToLocalStorage(); // Salva tutte le ricette
                  },
                  error: (err4) => {
                    let errore4 = err4.error;
                    this.disabled = false;
                    alert(errore4);
                  },
                });
              },
              error: (err3) => {
                let errore3 = err3.error;
                this.disabled = false;
                alert(errore3);
              },
            });
          },
          error: (err2) => {
            let errore2 = err2.error;
            this.disabled = false;
            alert(errore2);
          },
        });
      },
      error: (err1) => {
        let errore1 = err1.error;
        this.disabled = false;
        alert(errore1);
      },
    });
  }
  private saveToLocalStorage() {
    localStorage.setItem('ricetta', this.ricette.question);
    localStorage.setItem('ricetta2', this.ricette2.question);
    localStorage.setItem('ricetta3', this.ricette3.question);
    localStorage.setItem('ricetta4', this.ricette4.question);
  }
}
