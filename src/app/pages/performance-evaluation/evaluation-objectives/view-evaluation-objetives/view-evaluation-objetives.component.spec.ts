import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEvaluationObjetivesComponent } from './view-evaluation-objetives.component';

describe('ViewEvaluationObjetivesComponent', () => {
  let component: ViewEvaluationObjetivesComponent;
  let fixture: ComponentFixture<ViewEvaluationObjetivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEvaluationObjetivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEvaluationObjetivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
