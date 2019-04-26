import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponentsComponent } from './stepper-components.component';

describe('StepperComponentsComponent', () => {
  let component: StepperComponentsComponent;
  let fixture: ComponentFixture<StepperComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
