import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsApprovalsComponent } from './consultations-approvals.component';

describe('ConsultationsApprovalsComponent', () => {
  let component: ConsultationsApprovalsComponent;
  let fixture: ComponentFixture<ConsultationsApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationsApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
