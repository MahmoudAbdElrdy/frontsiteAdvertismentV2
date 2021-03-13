import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSingleViewComponent } from './map-single-view.component';

describe('MapSingleViewComponent', () => {
  let component: MapSingleViewComponent;
  let fixture: ComponentFixture<MapSingleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSingleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
