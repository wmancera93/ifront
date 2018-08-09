import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanningDateComponent } from './edit-planning-date.component';

describe('EditPlanningDateComponent', () => {
  let component: EditPlanningDateComponent;
  let fixture: ComponentFixture<EditPlanningDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlanningDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanningDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
