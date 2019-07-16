import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilStatusComponent } from './civil-status.component';

describe('CivilStatusComponent', () => {
  let component: CivilStatusComponent;
  let fixture: ComponentFixture<CivilStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CivilStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
