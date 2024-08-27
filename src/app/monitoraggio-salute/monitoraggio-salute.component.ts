// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import ApexCharts from 'apexcharts';
// import { MonitoraggioService } from '../services/monitoraggio.service';

// @Component({
//   selector: 'app-monitoraggio-salute',
//   templateUrl: './monitoraggio-salute.component.html',
//   styleUrls: ['./monitoraggio-salute.component.css'],
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule,RouterLink]
// })
// export class MonitoraggioComponent
// {
//   monitoraggioFormIbw: FormGroup;
//   monitoraggioFormBfp: FormGroup;
//   ibw: number = 0;
//   bfp: number = 0;

//   constructor(private fb: FormBuilder,monitoraggio:MonitoraggioService) 
//   {
//     this.monitoraggioFormIbw = this.fb.group({
//     altezza: ['', [Validators.required, Validators.min(1)]],
//     sesso: ['', Validators.required],
//     });
    
//     this.monitoraggioFormBfp = this.fb.group({
//     altezza: ['', [Validators.required, Validators.min(1)]],
//     sesso: ['', Validators.required],
//     girovita: ['', [Validators.required, Validators.min(1)]],
//     collo: ['', [Validators.required, Validators.min(1)]],
//     fianchi: ['', [Validators.required, Validators.min(1)]]
//     });
//   }


//   onSubmitIbw(): void {
//     if (this.monitoraggioFormIbw.valid) {
//       const {altezza, sesso} = this.monitoraggioFormIbw.value;
//       this.ibw = this.calculateIBW(altezza, sesso);
//     }
//   }

//   onSubmitBfp(): void {
//     if (this.monitoraggioFormBfp.valid) {
//       const {altezza, girovita, collo, fianchi, sesso} = this.monitoraggioFormBfp.value;
//       this.bfp = this.calculateBodyFatPercentage(altezza, girovita, collo, fianchi, sesso);
//     }
//   }

//   calculateBodyFatPercentage(altezza: number, girovita: number, collo: number, fianchi: number, sesso: string): number 
//   {
//     // Formula per calcolare la percentuale di massa grassa usando la formula di Jackson & Pollock
//     let bodyFatPercentage: number;
  
//     if (sesso === 'M') {
//       // Formula per gli uomini
//       bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(girovita - collo) + 0.15456 * Math.log10(altezza)) - 450;
//     } else {
//       // Formula per le donne
//       bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(girovita + fianchi - collo) + 0.22100 * Math.log10(altezza)) - 450;
//     }
  
//     return parseFloat(bodyFatPercentage.toFixed(2));
//   }

//   calculateIBW(altezza: number, sesso: string): number {
//     // Formula per calcolare l'IBW (Esempio: Devine formula)
//     if (sesso === 'M') {
//       return Math.round(50 + 0.9 * (altezza - 152.4));
//     } else {
//       return Math.round(45.5 + 0.9 * (altezza - 152.4));
//     }
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import ApexCharts from 'apexcharts';
import { MonitoraggioService } from '../services/monitoraggio.service';

@Component({
  selector: 'app-monitoraggio-salute',
  templateUrl: './monitoraggio-salute.component.html',
  styleUrls: ['./monitoraggio-salute.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class MonitoraggioComponent {
  monitoraggioForm: FormGroup;
  ibw: number = 0;
  bfp: number = 0;
  imc: number = 0;
  bmr: number = 0;
  tdee: number = 0;
  whr: number = 0;         // Rapporto Vita/Fianchi
  whtr: number = 0;        // Rapporto Vita/Altezza
  lbm: number = 0;         // Massa Corporea Magra (Lean Body Mass)
  ffmi: number = 0;        // Indice di Massa Corporea Magra (FFMI)
  proteinIntake: number = 0; // Fabbisogno Proteico
  hydrationStatus: number = 0; // Percentuale di Idratazione

  constructor(private fb: FormBuilder, monitoraggio: MonitoraggioService) 
  {
    this.monitoraggioForm = this.fb.group({
      altezza: ['', [Validators.required, Validators.min(1)]],
      peso: ['', [Validators.required, Validators.min(1)]],
      età: ['', [Validators.required, Validators.min(1)]],
      sesso: ['', Validators.required],
      livelloAttività: ['', Validators.required],
      girovita: ['', [Validators.required, Validators.min(1)]],
      collo: ['', [Validators.required, Validators.min(1)]],
      fianchi: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.monitoraggioForm.valid) {
      const { altezza, peso, età, girovita, collo, fianchi, sesso, livelloAttività } = this.monitoraggioForm.value;
      this.ibw = this.calculateIBW(altezza, sesso);
      this.bfp = this.calculateBodyFatPercentage(altezza, girovita, collo, fianchi, sesso);
      this.imc = this.calculateIMC(altezza, peso);
      this.bmr = this.calculateBMR(altezza, peso, età, sesso);
      this.tdee = this.calculateTDEE(this.bmr, livelloAttività);
      this.whr = this.calculateWHR(girovita, fianchi);
      this.whtr = this.calculateWHtR(girovita, altezza);
      this.lbm = this.calculateLBM(altezza, peso, sesso);
      this.ffmi = this.calculateFFMI(altezza, this.lbm);
      this.proteinIntake = this.calculateProteinIntake(peso, livelloAttività);
      this.hydrationStatus = this.calculateHydrationStatus(peso, sesso);
    }
  }

  calculateBodyFatPercentage(altezza: number, girovita: number, collo: number, fianchi: number, sesso: string): number {
    let bodyFatPercentage: number;

    if (sesso === 'M') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(girovita - collo) + 0.15456 * Math.log10(altezza)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(girovita + fianchi - collo) + 0.22100 * Math.log10(altezza)) - 450;
    }

    return parseFloat(bodyFatPercentage.toFixed(2));
  }

  calculateIBW(altezza: number, sesso: string): number {
    if (sesso === 'M') {
      return Math.round(50 + 0.9 * (altezza - 152.4));
    } else {
      return Math.round(45.5 + 0.9 * (altezza - 152.4));
    }
  }

  calculateIMC(altezza: number, peso: number): number {
    const altezzaInMetri = altezza / 100;
    return parseFloat((peso / (altezzaInMetri * altezzaInMetri)).toFixed(2));
  }

  calculateBMR(altezza: number, peso: number, età: number, sesso: string): number {
    if (sesso === 'M') {
      return Math.round(88.36 + (13.4 * peso) + (4.8 * altezza) - (5.7 * età));
    } else {
      return Math.round(447.6 + (9.2 * peso) + (3.1 * altezza) - (4.3 * età));
    }
  }

  calculateTDEE(bmr: number, livelloAttività: string): number {
    const livelloAttivitàFattore: { [key: string]: number } = {
      sedentario: 1.2,
      leggero: 1.375,
      moderato: 1.55,
      intenso: 1.725,
      moltoIntenso: 1.9
    };
    return Math.round(bmr * livelloAttivitàFattore[livelloAttività]);
  }

  calculateWHR(girovita: number, fianchi: number): number {
    return parseFloat((girovita / fianchi).toFixed(2));
  }

  calculateWHtR(girovita: number, altezza: number): number {
    return parseFloat((girovita / altezza).toFixed(2));
  }

  calculateLBM(altezza: number, peso: number, sesso: string): number {
    let lbm: number;
    if (sesso === 'M') {
      lbm = (0.407 * peso) + (0.267 * altezza) - 19.2;
    } else {
      lbm = (0.252 * peso) + (0.473 * altezza) - 48.3;
    }
    return parseFloat(lbm.toFixed(2));
  }

  calculateFFMI(altezza: number, lbm: number): number {
    const altezzaInMetri = altezza / 100;
    return parseFloat((lbm / (altezzaInMetri * altezzaInMetri)).toFixed(2));
  }

  calculateProteinIntake(peso: number, livelloAttività: string): number {
    const activityFactor: { [key: string]: number } = {
      sedentario: 0.8,
      leggero: 1.0,
      moderato: 1.2,
      intenso: 1.5,
      moltoIntenso: 1.8
    };
    const factor = activityFactor[livelloAttività] || 0.8;
    return parseFloat((peso * factor).toFixed(2));
  }

  calculateHydrationStatus(peso: number, sesso: string): number {
    const waterPercentage = sesso === 'M' ? 0.60 : 0.55;
    const totalBodyWater = peso * waterPercentage;
    return parseFloat(((totalBodyWater / peso) * 100).toFixed(2));
  }
}