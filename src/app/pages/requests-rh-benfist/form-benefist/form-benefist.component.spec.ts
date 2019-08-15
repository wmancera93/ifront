import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBenefistComponent } from './form-benefist.component';

describe('FormBenefistComponent', () => {
  let component: FormBenefistComponent;
  let fixture: ComponentFixture<FormBenefistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBenefistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBenefistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
