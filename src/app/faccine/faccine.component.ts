import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faccine',
  standalone: true,
  imports: [],
  templateUrl: './faccine.component.html',
  styleUrl: './faccine.component.css'
})
export class FaccineComponent {
  constructor(){}
  @Input()day!:number;

  selectedEmoji: string | null = null;

  selectEmoji(emoji: string) {
    this.selectedEmoji = emoji;
  }

}
