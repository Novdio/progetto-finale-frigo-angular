import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PranzoComponent } from './pranzo.component';

describe('PranzoComponent', () => {
  let component: PranzoComponent;
  let fixture: ComponentFixture<PranzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PranzoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PranzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
