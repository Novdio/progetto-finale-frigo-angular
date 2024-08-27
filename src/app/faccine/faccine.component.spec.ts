import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaccineComponent } from './faccine.component';

describe('FaccineComponent', () => {
  let component: FaccineComponent;
  let fixture: ComponentFixture<FaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaccineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
