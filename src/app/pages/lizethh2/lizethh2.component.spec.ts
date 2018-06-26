import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lizethh2Component } from './lizethh2.component';

describe('Lizethh2Component', () => {
  let component: Lizethh2Component;
  let fixture: ComponentFixture<Lizethh2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lizethh2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lizethh2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
