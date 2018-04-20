import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsRhComponent } from './requests-rh.component';

describe('RequestsRhComponent', () => {
  let component: RequestsRhComponent;
  let fixture: ComponentFixture<RequestsRhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsRhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
