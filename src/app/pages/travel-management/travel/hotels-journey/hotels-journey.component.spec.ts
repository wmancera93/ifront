import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsJourneyComponent } from './hotels-journey.component';

describe('HotelsJourneyComponent', () => {
  let component: HotelsJourneyComponent;
  let fixture: ComponentFixture<HotelsJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
