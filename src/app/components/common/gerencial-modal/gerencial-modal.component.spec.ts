import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerencialModalComponent } from './gerencial-modal.component';

describe('GerencialModalComponent', () => {
  let component: GerencialModalComponent;
  let fixture: ComponentFixture<GerencialModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerencialModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerencialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
