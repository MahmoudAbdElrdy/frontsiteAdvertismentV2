import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAdsComponent } from './rate-ads.component';

describe('RateAdsComponent', () => {
  let component: RateAdsComponent;
  let fixture: ComponentFixture<RateAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
