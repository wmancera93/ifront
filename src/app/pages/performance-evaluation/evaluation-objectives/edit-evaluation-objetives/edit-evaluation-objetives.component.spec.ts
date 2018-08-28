import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvaluationObjetivesComponent } from './edit-evaluation-objetives.component';

describe('EditEvaluationObjetivesComponent', () => {
  let component: EditEvaluationObjetivesComponent;
  let fixture: ComponentFixture<EditEvaluationObjetivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEvaluationObjetivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEvaluationObjetivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
