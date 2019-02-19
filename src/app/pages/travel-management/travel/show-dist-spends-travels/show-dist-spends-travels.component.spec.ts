import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDistSpendsTravelsComponent } from './show-dist-spends-travels.component';

describe('ShowDistSpendsTravelsComponent', () => {
  let component: ShowDistSpendsTravelsComponent;
  let fixture: ComponentFixture<ShowDistSpendsTravelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDistSpendsTravelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDistSpendsTravelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
