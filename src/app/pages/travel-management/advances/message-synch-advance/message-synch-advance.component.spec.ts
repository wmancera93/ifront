import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSynchAdvanceComponent } from './message-synch-advance.component';

describe('MessageSynchAdvanceComponent', () => {
  let component: MessageSynchAdvanceComponent;
  let fixture: ComponentFixture<MessageSynchAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSynchAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSynchAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
