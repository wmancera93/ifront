import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbargoesComponent } from './embargoes.component';

describe('EmbargoesComponent', () => {
  let component: EmbargoesComponent;
  let fixture: ComponentFixture<EmbargoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbargoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbargoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
