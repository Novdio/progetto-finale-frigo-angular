import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor( private router: Router, private profServ:ProfileService){}

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
      age:new FormControl("", [Validators.required]),
      sex:new FormControl("", [Validators.required]),
    }
  )
  ngOnInit(): void {
    this.profileInfo.patchValue({
      username: localStorage.getItem('username') || '',
      email: localStorage.getItem('email') || '',
      name: localStorage.getItem('name') || '',
      surname: localStorage.getItem('surname') || '',
      weight: localStorage.getItem('weight') || '',
      height: localStorage.getItem('height') || '',
      age: localStorage.getItem('age') || '',
      sex: localStorage.getItem('sex') || ''
    });
  }

  moreInfo() {
    const id = Number(localStorage.getItem('id'));
    if (isNaN(id)) {
      console.error('Invalid ID in localStorage');
      return;
    }

    this.profServ.getUserInfo(id).subscribe(
      existingInfo => {
        // se profilo con info esiste fa chiamata PUT 
        this.profServ.updateUserInfo(id, this.profileInfo.value).subscribe(
          {
            next: data => {
              this.saveToLocalStorage();
            },  
            error: err => {
              console.error('Error updating info:', err);
            }
          }
        );
      },
      error => {
        // se profilo non esiste fa chiamata POST
        this.profServ.createUserInfo(id, this.profileInfo.value).subscribe(
          {
            next: data => {
              this.saveToLocalStorage();
            },
            error: err => {
              console.error('Error creating info:', err);
            }
          }
        );
      }
    ); 
  }

  private saveToLocalStorage() {
    localStorage.setItem("username", this.profileInfo.value.username);
    localStorage.setItem("email", this.profileInfo.value.email);
    localStorage.setItem("name", this.profileInfo.value.name);
    localStorage.setItem("surname", this.profileInfo.value.surname);
    localStorage.setItem("weight", this.profileInfo.value.weight);
    localStorage.setItem("height", this.profileInfo.value.height);
    localStorage.setItem("age", this.profileInfo.value.age);
    localStorage.setItem("sex", this.profileInfo.value.sex);
  }
}

