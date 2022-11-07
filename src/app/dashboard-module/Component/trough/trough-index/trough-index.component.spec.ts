import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroughIndexComponent } from './trough-index.component';

describe('TroughIndexComponent', () => {
  let component: TroughIndexComponent;
  let fixture: ComponentFixture<TroughIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroughIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TroughIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
