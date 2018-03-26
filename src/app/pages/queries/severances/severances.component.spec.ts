import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverancesComponent } from './severances.component';

describe('SeverancesComponent', () => {
  let component: SeverancesComponent;
  let fixture: ComponentFixture<SeverancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeverancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeverancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
