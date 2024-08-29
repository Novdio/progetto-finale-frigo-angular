import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CaroselloComponent } from "../carosello/carosello.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, CaroselloComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
