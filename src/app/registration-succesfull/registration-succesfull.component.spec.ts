import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSuccesfullComponent } from './registration-succesfull.component';

describe('RegistrationSuccesfullComponent', () => {
  let component: RegistrationSuccesfullComponent;
  let fixture: ComponentFixture<RegistrationSuccesfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationSuccesfullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationSuccesfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
