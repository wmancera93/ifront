import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTransportationComponent } from './form-transportation.component';

describe('FormTransportationComponent', () => {
  let component: FormTransportationComponent;
  let fixture: ComponentFixture<FormTransportationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
