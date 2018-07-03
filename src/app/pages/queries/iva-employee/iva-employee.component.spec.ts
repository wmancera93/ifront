import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvaEmployeeComponent } from './iva-employee.component';

describe('IvaEmployeeComponent', () => {
  let component: IvaEmployeeComponent;
  let fixture: ComponentFixture<IvaEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvaEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvaEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
