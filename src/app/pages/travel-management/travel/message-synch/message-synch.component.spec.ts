import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSynchComponent } from './message-synch.component';

describe('MessageSynchComponent', () => {
  let component: MessageSynchComponent;
  let fixture: ComponentFixture<MessageSynchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSynchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSynchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
