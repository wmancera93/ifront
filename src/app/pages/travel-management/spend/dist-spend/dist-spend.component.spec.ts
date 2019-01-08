import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistSpendComponent } from './dist-spend.component';

describe('DistSpendComponent', () => {
  let component: DistSpendComponent;
  let fixture: ComponentFixture<DistSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
