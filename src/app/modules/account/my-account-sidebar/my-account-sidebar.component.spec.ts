import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountSidebarComponent } from './my-account-sidebar.component';

describe('MyAccountSidebarComponent', () => {
  let component: MyAccountSidebarComponent;
  let fixture: ComponentFixture<MyAccountSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
