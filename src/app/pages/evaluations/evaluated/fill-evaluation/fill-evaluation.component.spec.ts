import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillEvaluationComponent } from './fill-evaluation.component';

describe('FillEvaluationComponent', () => {
  let component: FillEvaluationComponent;
  let fixture: ComponentFixture<FillEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
