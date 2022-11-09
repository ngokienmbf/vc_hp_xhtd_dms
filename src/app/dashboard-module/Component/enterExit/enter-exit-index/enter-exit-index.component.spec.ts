import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterExitIndexComponent } from './enter-exit-index.component';

describe('EnterExitIndexComponent', () => {
  let component: EnterExitIndexComponent;
  let fixture: ComponentFixture<EnterExitIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterExitIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterExitIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
