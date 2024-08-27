import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpuntinoComponent } from './spuntino.component';

describe('SpuntinoComponent', () => {
  let component: SpuntinoComponent;
  let fixture: ComponentFixture<SpuntinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpuntinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpuntinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
