import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsDetailsTravelsComponent } from './approvals-details-travels.component';

describe('ApprovalsDetailsTravelsComponent', () => {
  let component: ApprovalsDetailsTravelsComponent;
  let fixture: ComponentFixture<ApprovalsDetailsTravelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalsDetailsTravelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsDetailsTravelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
