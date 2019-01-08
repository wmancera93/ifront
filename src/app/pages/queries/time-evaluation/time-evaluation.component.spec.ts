import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEvaluationComponent } from './time-evaluation.component';

describe('TimeEvaluationComponent', () => {
  let component: TimeEvaluationComponent;
  let fixture: ComponentFixture<TimeEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
