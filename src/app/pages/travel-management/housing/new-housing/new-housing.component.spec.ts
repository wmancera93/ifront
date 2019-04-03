import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHousingComponent } from './new-housing.component';

describe('NewHousingComponent', () => {
  let component: NewHousingComponent;
  let fixture: ComponentFixture<NewHousingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHousingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
