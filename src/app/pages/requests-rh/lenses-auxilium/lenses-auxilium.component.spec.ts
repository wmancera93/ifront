import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LensesAuxiliumComponent } from './lenses-auxilium.component';

describe('LensesAuxiliumComponent', () => {
  let component: LensesAuxiliumComponent;
  let fixture: ComponentFixture<LensesAuxiliumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LensesAuxiliumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LensesAuxiliumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
