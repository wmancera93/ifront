import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsApproversComponent } from './requests-approvers.component';

describe('RequestsApproversComponent', () => {
  let component: RequestsApproversComponent;
  let fixture: ComponentFixture<RequestsApproversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsApproversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsApproversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
