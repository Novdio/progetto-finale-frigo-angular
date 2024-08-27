import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ColazioneComponent } from "../colazione/colazione.component";
import { SpuntinoComponent } from "../spuntino/spuntino.component";
import { PranzoComponent } from "../pranzo/pranzo.component";
import { MerendaComponent } from '../merenda/merenda.component';
import { CenaComponent } from "../cena/cena.component";
import { FaccineComponent } from "../faccine/faccine.component";


@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, RouterLink, ColazioneComponent, SpuntinoComponent, PranzoComponent, MerendaComponent, CenaComponent, FaccineComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent 
{
  constructor(){}
}
