import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoraggioSaluteComponent } from './monitoraggio-salute.component';

describe('MonitoraggioSaluteComponent', () => {
  let component: MonitoraggioSaluteComponent;
  let fixture: ComponentFixture<MonitoraggioSaluteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoraggioSaluteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoraggioSaluteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
