import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuNavigationComponent } from './manu-navigation.component';

describe('ManuNavigationComponent', () => {
  let component: ManuNavigationComponent;
  let fixture: ComponentFixture<ManuNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
