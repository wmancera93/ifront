import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamReportsComponent } from './my-team-reports.component';

describe('MyTeamReportsComponent', () => {
  let component: MyTeamReportsComponent;
  let fixture: ComponentFixture<MyTeamReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeamReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
