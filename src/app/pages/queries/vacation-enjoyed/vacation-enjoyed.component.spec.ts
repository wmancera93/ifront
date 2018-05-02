import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationEnjoyedComponent } from './vacation-enjoyed.component';

describe('VacationEnjoyedComponent', () => {
  let component: VacationEnjoyedComponent;
  let fixture: ComponentFixture<VacationEnjoyedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationEnjoyedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationEnjoyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
