import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPrimaryComponent } from './progress-primary.component';

describe('ProgressPrimaryComponent', () => {
  let component: ProgressPrimaryComponent;
  let fixture: ComponentFixture<ProgressPrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
