import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColazioneComponent } from './colazione.component';

describe('ColazioneComponent', () => {
  let component: ColazioneComponent;
  let fixture: ComponentFixture<ColazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColazioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
