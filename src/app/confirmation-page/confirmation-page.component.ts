import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-page.component.html',
  styleUrl: './confirmation-page.component.css',
})
export class ConfirmationPageComponent {
  constructor(private route: ActivatedRoute) {
    let token: string = route.snapshot.paramMap.get('token')!;
    localStorage.setItem('token', token);
  }
}
