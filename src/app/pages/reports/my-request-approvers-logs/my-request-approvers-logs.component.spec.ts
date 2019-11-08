import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestApproversLogsComponent } from './my-request-approvers-logs.component';

describe('MyRequestApproversLogsComponent', () => {
  let component: MyRequestApproversLogsComponent;
  let fixture: ComponentFixture<MyRequestApproversLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRequestApproversLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestApproversLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
