import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTravelComponent } from './pending-travel.component';

describe('PendingTravelComponent', () => {
  let component: PendingTravelComponent;
  let fixture: ComponentFixture<PendingTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
