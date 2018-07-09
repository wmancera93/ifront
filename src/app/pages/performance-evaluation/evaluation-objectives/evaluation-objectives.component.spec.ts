import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationObjectivesComponent } from './evaluation-objectives.component';

describe('EvaluationObjectivesComponent', () => {
  let component: EvaluationObjectivesComponent;
  let fixture: ComponentFixture<EvaluationObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
