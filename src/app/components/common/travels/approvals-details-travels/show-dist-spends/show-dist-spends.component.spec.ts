import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDistSpendsComponent } from './show-dist-spends.component';

describe('ShowDistSpendsComponent', () => {
  let component: ShowDistSpendsComponent;
  let fixture: ComponentFixture<ShowDistSpendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDistSpendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDistSpendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
