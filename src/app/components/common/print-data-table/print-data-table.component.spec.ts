import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDataTableComponent } from './print-data-table.component';

describe('PrintDataTableComponent', () => {
  let component: PrintDataTableComponent;
  let fixture: ComponentFixture<PrintDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
