import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPrimaryComponent } from './notification-primary.component';

describe('NotificationPrimaryComponent', () => {
  let component: NotificationPrimaryComponent;
  let fixture: ComponentFixture<NotificationPrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
