import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsArrayComponent } from './details-array.component';

describe('DetailsArrayComponent', () => {
  let component: DetailsArrayComponent;
  let fixture: ComponentFixture<DetailsArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
