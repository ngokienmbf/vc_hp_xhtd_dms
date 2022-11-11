import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOperatingIndexComponent } from './order-operating-index.component';

describe('OrderOperatingIndexComponent', () => {
  let component: OrderOperatingIndexComponent;
  let fixture: ComponentFixture<OrderOperatingIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderOperatingIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderOperatingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
