import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOperatingCreateComponent } from './order-operating-create.component';

describe('OrderOperatingCreateComponent', () => {
  let component: OrderOperatingCreateComponent;
  let fixture: ComponentFixture<OrderOperatingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOperatingCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderOperatingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
