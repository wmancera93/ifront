import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalPostsComponent } from './historical-posts.component';

describe('HistoricalPostsComponent', () => {
  let component: HistoricalPostsComponent;
  let fixture: ComponentFixture<HistoricalPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
