import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedTravelComponent } from './managed-travel.component';

describe('ManagedTravelComponent', () => {
  let component: ManagedTravelComponent;
  let fixture: ComponentFixture<ManagedTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
