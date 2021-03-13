import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdsStp2Component } from './add-ads-stp2.component';

describe('AddAdsStp2Component', () => {
  let component: AddAdsStp2Component;
  let fixture: ComponentFixture<AddAdsStp2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdsStp2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdsStp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
