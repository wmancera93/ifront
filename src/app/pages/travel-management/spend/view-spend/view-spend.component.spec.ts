import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpendComponent } from './view-spend.component';

describe('ViewSpendComponent', () => {
  let component: ViewSpendComponent;
  let fixture: ComponentFixture<ViewSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
