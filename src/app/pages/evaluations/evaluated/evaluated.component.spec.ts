import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedComponent } from './evaluated.component';

describe('EvaluatedComponent', () => {
  let component: EvaluatedComponent;
  let fixture: ComponentFixture<EvaluatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
