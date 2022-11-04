import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidDeleteComponent } from './rfid-delete.component';

describe('RfidDeleteComponent', () => {
  let component: RfidDeleteComponent;
  let fixture: ComponentFixture<RfidDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
