import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedComponent } from './managed.component';

describe('ManagedComponent', () => {
  let component: ManagedComponent;
  let fixture: ComponentFixture<ManagedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
