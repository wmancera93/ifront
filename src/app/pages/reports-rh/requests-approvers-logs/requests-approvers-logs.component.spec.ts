import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsApproversLogsComponent } from './requests-approvers-logs.component';

describe('RequestsApproversLogsComponent', () => {
  let component: RequestsApproversLogsComponent;
  let fixture: ComponentFixture<RequestsApproversLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsApproversLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsApproversLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
