import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningEvaluationComponent } from './planning-evaluation.component';

describe('PlanningEvaluationComponent', () => {
  let component: PlanningEvaluationComponent;
  let fixture: ComponentFixture<PlanningEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
