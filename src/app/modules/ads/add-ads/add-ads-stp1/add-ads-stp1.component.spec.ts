import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdsStp1Component } from './add-ads-stp1.component';

describe('AddAdsStp1Component', () => {
  let component: AddAdsStp1Component;
  let fixture: ComponentFixture<AddAdsStp1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdsStp1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdsStp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
