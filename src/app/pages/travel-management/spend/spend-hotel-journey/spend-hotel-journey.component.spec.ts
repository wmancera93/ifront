import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendHotelJourneyComponent } from './spend-hotel-journey.component';

describe('SpendHotelJourneyComponent', () => {
  let component: SpendHotelJourneyComponent;
  let fixture: ComponentFixture<SpendHotelJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendHotelJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendHotelJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
