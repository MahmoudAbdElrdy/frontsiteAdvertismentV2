import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmSingleViewComponent } from './osm-single-view.component';

describe('OsmSingleViewComponent', () => {
  let component: OsmSingleViewComponent;
  let fixture: ComponentFixture<OsmSingleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsmSingleViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmSingleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
