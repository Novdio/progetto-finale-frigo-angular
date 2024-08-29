import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MonitoraggioService } from '../services/monitoraggio.service';

@Component({
  selector: 'app-monitoraggio-salute',
  templateUrl: './monitoraggio-salute.component.html',
  styleUrls: ['./monitoraggio-salute.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class MonitoraggioComponent 
{
  monitoraggioFormIbw: FormGroup;
  monitoraggioFormBfp: FormGroup;
  monitoraggioFormImc: FormGroup;
  monitoraggioFormLbm: FormGroup;
  monitoraggioFormWhr: FormGroup;
  monitoraggioFormWHtR: FormGroup;
  monitoraggioFormFfmi: FormGroup;
  monitoraggioFormBmr: FormGroup;
  monitoraggioFormTdee: FormGroup;
  monitoraggioFormProteinIntake: FormGroup;
  monitoraggioFormHydrationStatus: FormGroup;
  
  ibw: number = 0;
  bfp: number = 0;
  imc: number = 0;
  bmr: number = 0;
  tdee: number = 0;
  whr: number = 0;
  whtr: number = 0;
  lbm: number = 0;
  ffmi: number = 0;
  proteinIntake: number = 0;
  hydrationStatus: number = 0;

  constructor(private fb: FormBuilder, monitoraggio: MonitoraggioService) 
  {
    this.monitoraggioFormIbw = this.fb.group({
      altezza: ['', [Validators.required, Validators.min(1)]],
      sesso: ['', Validators.required],
    });

    this.monitoraggioFormBmr = this.fb.group({
      altezza: ['', [Validators.required, Validators.min(1)]],
      peso: ['', [Validators.required, Validators.min(1)]],
      eta: ['', [Validators.required, Validators.min(1)]],
      sesso: ['', Validators.required]
    });

    this.monitoraggioFormTdee = this.fb.group({
      livelloAttivita: ['', Validators.required],
      bmr: [{ value: ''}]
    });
    
    this.monitoraggioFormLbm = this.fb.group({
      peso: ['', [Validators.required, Validators.min(1)]],
      bfp: [{ value: ''}]
    });

    this.monitoraggioFormWhr = this.fb.group({
      girovita: ['', [Validators.required, Validators.min(1)]],
      fianchi: ['', [Validators.required, Validators.min(1)]]
    });

    this.monitoraggioFormBfp = this.fb.group({
      altezza: ['', [Validators.required, Validators.min(1)]],
      sesso: ['', Validators.required],
      girovita: ['', [Validators.required, Validators.min(1)]],
      collo: ['', [Validators.required, Validators.min(1)]],
      fianchi: ['', [Validators.required, Validators.min(1)]],
    });

    this.monitoraggioFormFfmi = this.fb.group({
      altezza: ['', [Validators.required, Validators.min(1)]],
      lbm: [{ value: ''}]
    });

    this.monitoraggioFormImc = this.fb.group({
      peso: ['', [Validators.required, Validators.min(1)]],
      altezza: ['', [Validators.required, Validators.min(1)]],
    });

    this.monitoraggioFormWHtR = this.fb.group({
      girovita: ['', [Validators.required, Validators.min(1)]],
      altezza: ['', [Validators.required, Validators.min(1)]]
    });

    this.monitoraggioFormProteinIntake = this.fb.group({
      peso: ['', [Validators.required, Validators.min(1)]],
      livelloAttivita: ['', Validators.required]
    });

    this.monitoraggioFormHydrationStatus = this.fb.group({
      peso: ['', [Validators.required, Validators.min(1)]],
      lbm: [{ value: ''}]
    });
  }

  onSubmitIbw(): void 
  {
    if (this.monitoraggioFormIbw.valid) 
    {
      const { altezza, sesso } = this.monitoraggioFormIbw.value;
      this.ibw = this.calculateIBW(altezza, sesso);
    }
  }

  onSubmitHydrationStatus(): void
  {
    if(this.monitoraggioFormHydrationStatus.valid)
    {
      const {peso, lbm} = this.monitoraggioFormHydrationStatus.value;
      this.hydrationStatus = this.calculateHydrationStatus(peso, lbm);
    }
  }

  onSubmitProteinIntake(): void
  {
    if (this.monitoraggioFormProteinIntake.valid)
    {
      const{peso, livelloAttivita} = this.monitoraggioFormProteinIntake.value;
      this.proteinIntake = this.calculateIdealProteinIntake(peso, livelloAttivita);
    }
  }

  onSubmitBmr(): void
  {
    if (this.monitoraggioFormBmr.valid)
    {
      const {peso, altezza, eta, sesso} = this.monitoraggioFormBmr.value;
      this.bmr = this.calculateBMR(peso, altezza, eta, sesso);
    }
  }

  onSubmitTdee(): void
  {
    if(this.monitoraggioFormTdee.valid)
    {
      const {bmr, livelloAttivita} = this.monitoraggioFormTdee.value;
      this.tdee = this.calculateTDEE(bmr, livelloAttivita);
    }
  }

  onSubmitWhtr(): void
  {
    if (this.monitoraggioFormWHtR.valid)
    {
      const {girovita, altezza} = this.monitoraggioFormWHtR.value;
      this.whtr = this.calculateWHtR(girovita, altezza);
    }
  }

  onSubmitImc(): void
  {
    if(this.monitoraggioFormImc.valid)
    {
      const {peso, altezza} = this.monitoraggioFormImc.value;
      this.imc = this.calculateBMI(peso, altezza); //naaniiii?!!!?
    }
  }

  onSubmitWhr(): void
  {
    if(this.monitoraggioFormWhr.valid)
    {
      const{girovita, fianchi} = this.monitoraggioFormWhr.value;
      this.whr = this.calculateWHR(girovita, fianchi);
    }
  }

  onSubmitLbm(): void 
  {
    if(this.monitoraggioFormLbm.valid)
    {
      const{peso, bfp} = this.monitoraggioFormLbm.value;
      this.lbm = this.calculateLBM(peso, bfp);
    }
  }

  onSubmitFfmi(): void
  {
    if(this.monitoraggioFormFfmi.valid)
    {
      const{altezza, lbm} = this.monitoraggioFormFfmi.value;
      this.ffmi = this.calculateFFMI(altezza, lbm);
    }
  }

  onSubmitBfp(): void 
  {
    if (this.monitoraggioFormBfp.valid) {
      const { altezza, girovita, collo, fianchi, sesso} = this.monitoraggioFormBfp.value;
      this.bfp = this.calculateBodyFatPercentage(altezza, girovita, collo, fianchi, sesso);
    }
  }

  calculateBodyFatPercentage(altezza: number, girovita: number, collo: number, fianchi: number, sesso: string): number 
  {
    let bodyFatPercentage: number;
    if (sesso === 'M') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(girovita - collo) + 0.15456 * Math.log10(altezza)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(girovita + fianchi - collo) + 0.22100 * Math.log10(altezza)) - 450;
    }
    return parseFloat(bodyFatPercentage.toFixed(2));
  }

  calculateIBW(altezza: number, sesso: string): number 
  {
    if (sesso === 'M') {
      return Math.round(50 + 0.9 * (altezza - 152.4));
    } else {
      return Math.round(45.5 + 0.9 * (altezza - 152.4));
    }
  }

  calculateBMI(peso: number, altezza: number): number 
  {
    const bmi = peso / Math.pow(altezza / 100, 2);
    return parseFloat(bmi.toFixed(2));
  }

  calculateBMR(peso: number, altezza: number, eta: number, sesso: string): number 
  {
    let bmr: number;
    if (sesso === 'M') {
      bmr = 88.36 + (13.4 * peso) + (4.8 * altezza) - (5.7 * eta);
    } else {
      bmr = 447.6 + (9.2 * peso) + (3.1 * altezza) - (4.3 * eta);
    }
    return parseFloat(bmr.toFixed(2));
  }

  calculateTDEE(bmr: number, livelloAttivita: string): number 
  {
    const activityMultipliers: { [key: string]: number } = {
      sedentario: 1.2,
      leggero: 1.375,
      moderato: 1.55,
      intenso: 1.725,
      moltoIntenso: 1.9,
    };
    console.log(bmr, activityMultipliers [livelloAttivita]);
    this.tdee = bmr * (activityMultipliers[livelloAttivita] || 1.2);
    console.log(this.tdee)
    return parseFloat(this.tdee.toFixed(2));
  }

  calculateWHR(girovita: number, fianchi: number): number 
  {
    const whr = girovita / fianchi;
    return parseFloat(whr.toFixed(2));
  }

  calculateWHtR(girovita: number, altezza: number): number 
  {
    const whtr = girovita / altezza;
    return parseFloat(whtr.toFixed(2));
  }

  calculateLBM(peso: number, bodyFatPercentage: number): number 
  {
    console.log(peso, bodyFatPercentage);
    const lbm = peso * (1 - bodyFatPercentage / 100);
    return parseFloat(lbm.toFixed(2));
  }

  calculateFFMI(lbm: number, altezza: number): number 
  {
    const altezzaInMetri = altezza / 100;
    const ffmi = lbm / Math.pow(altezzaInMetri, 2);
    return parseFloat(ffmi.toFixed(2));
  }

  calculateIdealProteinIntake(peso: number, livelloAttivita: string): number 
  {
    let fattoreAttivita: number;

    switch (livelloAttivita.toLowerCase()) {
      case 'sedentario':
          fattoreAttivita = 1.2;
          break;
      case 'moderato':
          fattoreAttivita = 1.6;
          break;
      case 'attivo':
          fattoreAttivita = 2.0;
          break;
      case 'molto attivo':
          fattoreAttivita = 2.4;
          break;
      default:
          throw new Error("Livello di attività non riconosciuto.");
    }

    const proteinIntake = peso * fattoreAttivita;
    return parseFloat(proteinIntake.toFixed(2));
  }

  calculateHydrationStatus(peso: number, lbm: number): number 
  {
    const hydrationFactorLbm = 0.033; 
    const hydrationFactorPeso = 0.035; 

    // Calcolo dell'assunzione d'acqua basata sulla massa magra
    const hydrationBasedOnLbm = lbm * hydrationFactorLbm;
    // Calcolo dell'assunzione d'acqua basata sul peso totale
    const hydrationBasedOnPeso = peso * hydrationFactorPeso;
    // Media dei due valori per una raccomandazione bilanciata
    const hydrationStatus = (hydrationBasedOnLbm + hydrationBasedOnPeso) / 2;
    
    return parseFloat(hydrationStatus.toFixed(2));
  }
}