import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineApproversComponent } from './time-line-approvers.component';

describe('TimeLineApproversComponent', () => {
  let component: TimeLineApproversComponent;
  let fixture: ComponentFixture<TimeLineApproversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLineApproversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineApproversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
