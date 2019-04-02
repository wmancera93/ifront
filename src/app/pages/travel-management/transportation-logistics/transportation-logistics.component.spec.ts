import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationLogisticsComponent } from './transportation-logistics.component';

describe('TransportationLogisticsComponent', () => {
  let component: TransportationLogisticsComponent;
  let fixture: ComponentFixture<TransportationLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
