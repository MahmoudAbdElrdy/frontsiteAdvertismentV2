import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalsInstallmentComponent } from './intervals-installment.component';

describe('IntervalsInstallmentComponent', () => {
  let component: IntervalsInstallmentComponent;
  let fixture: ComponentFixture<IntervalsInstallmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalsInstallmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalsInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
