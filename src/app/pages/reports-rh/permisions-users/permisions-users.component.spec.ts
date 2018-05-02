import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisionsUsersComponent } from './permisions-users.component';

describe('PermisionsUsersComponent', () => {
  let component: PermisionsUsersComponent;
  let fixture: ComponentFixture<PermisionsUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisionsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisionsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
