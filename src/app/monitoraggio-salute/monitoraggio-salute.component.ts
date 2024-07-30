import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-monitoraggio-salute',
  templateUrl: './monitoraggio-salute.component.html',
  styleUrls: ['./monitoraggio-salute.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class MonitoraggioComponent implements OnInit 
{
  monitoraggioForm: FormGroup;
  ibw: number = 0;
  progressData: any[] = [];
  chart: any;

  constructor(private fb: FormBuilder) 
  {
    this.monitoraggioForm = this.fb.group({
    peso: ['', [Validators.required, Validators.min(1)]],
    altezza: ['', [Validators.required, Validators.min(1)]],
    età: ['', [Validators.required, Validators.min(1)]],
    sesso: ['', Validators.required]
     });
  }

  ngOnInit(): void {
    

    this.loadProgressData();
    this.initChart();
  }

  onSubmit(): void {
    if (this.monitoraggioForm.valid) {
      const { peso, altezza, età, sesso } = this.monitoraggioForm.value;
      this.ibw = this.calculateIBW(altezza, sesso);
      this.saveProgressData({ peso, altezza, età, sesso, ibw: this.ibw, date: new Date() });
      this.updateChart();
    }
  }

  calculateIBW(altezza: number, sesso: string): number {
    // Formula per calcolare l'IBW (Esempio: Devine formula)
    if (sesso === 'M') {
      return 50 + 0.9 * (altezza - 152.4);
    } else {
      return 45.5 + 0.9 * (altezza - 152.4);
    }
  }

  saveProgressData(data: any): void {
    this.progressData.push(data);
    localStorage.setItem('progressData', JSON.stringify(this.progressData));
  }

  loadProgressData(): void {
    const data = localStorage.getItem('progressData');
    this.progressData = data ? JSON.parse(data) : [];
  }

  initChart(): void {
    this.chart = new Chart('progressChart', {
      type: 'line',
      data: {
        labels: this.progressData.map(data => new Date(data.date).toLocaleDateString()),
        datasets: [{
          label: 'Peso',
          data: this.progressData.map(data => data.peso),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: { type: 'time', time: { unit: 'week' } },
          y: { beginAtZero: true }
        }
      }
    });
  }

  updateChart(): void {
    this.chart.data.labels = this.progressData.map(data => new Date(data.date).toLocaleDateString());
    this.chart.data.datasets[0].data = this.progressData.map(data => data.peso);
    this.chart.update();
  }
}
