import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompnsatedVacationsComponent } from './compnsated-vacations.component';

describe('CompnsatedVacationsComponent', () => {
  let component: CompnsatedVacationsComponent;
  let fixture: ComponentFixture<CompnsatedVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompnsatedVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompnsatedVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
