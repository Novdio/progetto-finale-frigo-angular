import { Component } from '@angular/core';
import { ProvaComponent } from "../carosello/prova.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProvaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
