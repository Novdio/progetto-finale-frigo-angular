import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerendaComponent } from './merenda.component';

describe('MerendaComponent', () => {
  let component: MerendaComponent;
  let fixture: ComponentFixture<MerendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
