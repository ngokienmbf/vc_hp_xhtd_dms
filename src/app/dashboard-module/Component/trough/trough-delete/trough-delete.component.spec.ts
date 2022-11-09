import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroughDeleteComponent } from './trough-delete.component';

describe('TroughDeleteComponent', () => {
  let component: TroughDeleteComponent;
  let fixture: ComponentFixture<TroughDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroughDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TroughDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
