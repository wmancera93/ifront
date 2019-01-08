import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHotelsJourneyComponent } from './show-hotels-journey.component';

describe('ShowHotelsJourneyComponent', () => {
  let component: ShowHotelsJourneyComponent;
  let fixture: ComponentFixture<ShowHotelsJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHotelsJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHotelsJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
