import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvaluationObjectivesComponent } from './edit-evaluation-objectives.component';

describe('EditEvaluationObjectivesComponent', () => {
  let component: EditEvaluationObjectivesComponent;
  let fixture: ComponentFixture<EditEvaluationObjectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEvaluationObjectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEvaluationObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
