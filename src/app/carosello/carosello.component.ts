import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-carosello',
  standalone: true,
  imports: [],
  templateUrl: './carosello.component.html',
  styleUrl: './carosello.component.css',
})
export class CaroselloComponent implements OnInit, OnDestroy {
  @ViewChild('carosello') carosello!: ElementRef;
  private intervalId: any;

  ngOnInit() {
    // Avvia l'autoplay quando il componente viene inizializzato
    this.startAutoplay();
  }

  ngOnDestroy() {
    // Ferma l'autoplay quando il componente viene distrutto
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  next() {
    this.carosello.nativeElement.scrollBy({
      left: this.carosello.nativeElement.offsetWidth,
      behavior: 'smooth',
    });
  }

  prev() {
    this.carosello.nativeElement.scrollBy({
      left: -this.carosello.nativeElement.offsetWidth,
      behavior: 'smooth',
    });
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 40000); // Cambia immagine ogni 40 secondi
  }
}
