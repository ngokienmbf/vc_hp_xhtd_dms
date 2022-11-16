import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightStationIndexComponent } from './weight-station-index.component';

describe('WeightStationIndexComponent', () => {
  let component: WeightStationIndexComponent;
  let fixture: ComponentFixture<WeightStationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightStationIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightStationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
