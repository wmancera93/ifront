import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmResetAcountComponent } from './confirm-reset-acount.component';

describe('ConfirmResetAcountComponent', () => {
  let component: ConfirmResetAcountComponent;
  let fixture: ComponentFixture<ConfirmResetAcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmResetAcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmResetAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
