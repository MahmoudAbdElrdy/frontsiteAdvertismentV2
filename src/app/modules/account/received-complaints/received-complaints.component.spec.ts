import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedComplaintsComponent } from './received-complaints.component';

describe('ReceivedComplaintsComponent', () => {
  let component: ReceivedComplaintsComponent;
  let fixture: ComponentFixture<ReceivedComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
