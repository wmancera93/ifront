import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerialComponent } from './managerial.component';

describe('ManagerialComponent', () => {
  let component: ManagerialComponent;
  let fixture: ComponentFixture<ManagerialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
