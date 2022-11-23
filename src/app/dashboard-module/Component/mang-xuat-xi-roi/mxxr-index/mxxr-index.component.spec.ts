import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MxxrIndexComponent } from './mxxr-index.component';

describe('MxxrIndexComponent', () => {
  let component: MxxrIndexComponent;
  let fixture: ComponentFixture<MxxrIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MxxrIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MxxrIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
