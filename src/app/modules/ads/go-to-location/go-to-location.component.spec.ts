import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToLocationComponent } from './go-to-location.component';

describe('GoToLocationComponent', () => {
  let component: GoToLocationComponent;
  let fixture: ComponentFixture<GoToLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoToLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
