import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdvancesComponent } from './new-advances.component';

describe('NewAdvancesComponent', () => {
  let component: NewAdvancesComponent;
  let fixture: ComponentFixture<NewAdvancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
