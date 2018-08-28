import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHourExtrasComponent } from './my-hour-extras.component';

describe('MyHourExtrasComponent', () => {
  let component: MyHourExtrasComponent;
  let fixture: ComponentFixture<MyHourExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHourExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHourExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
