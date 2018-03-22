import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilitiesComponent } from './disabilities.component';

describe('DisabilitiesComponent', () => {
  let component: DisabilitiesComponent;
  let fixture: ComponentFixture<DisabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
