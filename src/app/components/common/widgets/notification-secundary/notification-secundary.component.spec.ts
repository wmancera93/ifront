import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSecundaryComponent } from './notification-secundary.component';

describe('NotificationSecundaryComponent', () => {
  let component: NotificationSecundaryComponent;
  let fixture: ComponentFixture<NotificationSecundaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSecundaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSecundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
