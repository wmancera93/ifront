import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsRhBenefistComponent } from './requests-rh-benefist.component';

describe('RequestsRhComponent', () => {
  let component: RequestsRhBenefistComponent;
  let fixture: ComponentFixture<RequestsRhBenefistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsRhBenefistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsRhBenefistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
