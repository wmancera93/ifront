import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsRequestsComponent } from './forms-requests.component';

describe('FormsRequestsComponent', () => {
  let component: FormsRequestsComponent;
  let fixture: ComponentFixture<FormsRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
