import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourExtrasComponent } from './hour-extras.component';

describe('HourExtrasComponent', () => {
  let component: HourExtrasComponent;
  let fixture: ComponentFixture<HourExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
