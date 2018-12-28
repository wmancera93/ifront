import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSynchSpendComponent } from './message-synch-spend.component';

describe('MessageSynchSpendComponent', () => {
  let component: MessageSynchSpendComponent;
  let fixture: ComponentFixture<MessageSynchSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSynchSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSynchSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
