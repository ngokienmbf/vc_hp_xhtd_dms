import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinkerIndexComponent } from './clinker-index.component';

describe('ClinkerIndexComponent', () => {
  let component: ClinkerIndexComponent;
  let fixture: ComponentFixture<ClinkerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinkerIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinkerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
