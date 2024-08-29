import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CaroselloComponent } from "../carosello/carosello.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CaroselloComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
