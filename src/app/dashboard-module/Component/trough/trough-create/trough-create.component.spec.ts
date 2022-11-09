import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TroughCreateComponent } from './trough-create.component';

describe('TroughCreateComponent', () => {
  let component: TroughCreateComponent;
  let fixture: ComponentFixture<TroughCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TroughCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TroughCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
