import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingsEvalComponent } from './pendings-eval.component';

describe('PendingsEvalComponent', () => {
  let component: PendingsEvalComponent;
  let fixture: ComponentFixture<PendingsEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingsEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingsEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
