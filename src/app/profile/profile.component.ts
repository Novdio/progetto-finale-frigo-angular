import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor( private router: Router){}

  accordionOpened: { [key: string]: boolean } = { rec1: false, rec2: false };

  toggleAccordion(recipe: string) {
    // Controllo per evitare errori di runtime
    if (this.accordionOpened.hasOwnProperty(recipe)) {
      this.accordionOpened[recipe] = !this.accordionOpened[recipe];
    }
  }
  profileInfo:FormGroup = new FormGroup
  (
    {
      username:new FormControl("", [Validators.required]),
      email:new FormControl("", [Validators.required, Validators.email]),
      name:new FormControl("", [Validators.required]),
      surname:new FormControl("", [Validators.required]),
      weight:new FormControl("", [Validators.required]),
      height:new FormControl("", [Validators.required]),
    }
  )
  ngOnInit(): void {
    this.populateForm();
  }

  populateForm(): void {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (username && email) {
      this.profileInfo.patchValue({
        username: username,
        email: email
      });
    }
  }


}
