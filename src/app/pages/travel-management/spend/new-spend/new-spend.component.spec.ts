import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpendComponent } from './new-spend.component';

describe('NewSpendComponent', () => {
  let component: NewSpendComponent;
  let fixture: ComponentFixture<NewSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
