import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LizethComponent } from './lizeth.component';

describe('LizethComponent', () => {
  let component: LizethComponent;
  let fixture: ComponentFixture<LizethComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LizethComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LizethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
