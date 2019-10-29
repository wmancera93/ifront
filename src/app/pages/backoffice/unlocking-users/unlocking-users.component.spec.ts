import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockingUsersComponent } from './unlocking-users.component';

describe('UnlockingUsersComponent', () => {
  let component: UnlockingUsersComponent;
  let fixture: ComponentFixture<UnlockingUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockingUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
