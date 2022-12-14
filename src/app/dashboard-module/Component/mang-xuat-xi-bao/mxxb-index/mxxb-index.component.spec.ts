// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { MxxbIndexComponent } from './mxxb-index.component';

// describe('MxxbIndexComponent', () => {
//   let component: MxxbIndexComponent;
//   let fixture: ComponentFixture<MxxbIndexComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ MxxbIndexComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MxxbIndexComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinkerIndexComponent } from './mxxb-index.component';

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

