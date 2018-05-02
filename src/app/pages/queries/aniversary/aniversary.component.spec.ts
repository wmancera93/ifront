import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AniversaryComponent } from './aniversary.component';

describe('AniversaryComponent', () => {
  let component: AniversaryComponent;
  let fixture: ComponentFixture<AniversaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniversaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AniversaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
