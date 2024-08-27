// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { MonitoraggioSaluteComponent } from './monitoraggio-salute.component';

// describe('MonitoraggioSaluteComponent', () => {
//   let component: MonitoraggioSaluteComponent;
//   let fixture: ComponentFixture<MonitoraggioSaluteComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [MonitoraggioSaluteComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MonitoraggioSaluteComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoraggioComponent } from './monitoraggio-salute.component';

describe('MonitoraggioSaluteComponent', () => {
  let component: MonitoraggioComponent;
  let fixture: ComponentFixture<MonitoraggioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoraggioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoraggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
