import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrequestComponent } from './copyrequest.component';

describe('CopyrequestComponent', () => {
  let component: CopyrequestComponent;
  let fixture: ComponentFixture<CopyrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
