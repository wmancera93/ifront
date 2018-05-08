import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPageHttpComponent } from './error-page-http.component';

describe('ErrorPageHttpComponent', () => {
  let component: ErrorPageHttpComponent;
  let fixture: ComponentFixture<ErrorPageHttpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPageHttpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPageHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
