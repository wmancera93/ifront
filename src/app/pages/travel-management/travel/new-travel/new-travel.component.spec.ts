import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTravelComponent } from './new-travel.component';

describe('NewTravelComponent', () => {
  let component: NewTravelComponent;
  let fixture: ComponentFixture<NewTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
