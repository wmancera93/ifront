import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestApproversComponent } from './my-request-approvers.component';

describe('MyRequestApproversComponent', () => {
  let component: MyRequestApproversComponent;
  let fixture: ComponentFixture<MyRequestApproversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRequestApproversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestApproversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
