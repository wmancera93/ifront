import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraHoursComponent } from './extra-hours.component';

describe('ExtraHoursComponent', () => {
  let component: ExtraHoursComponent;
  let fixture: ComponentFixture<ExtraHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
