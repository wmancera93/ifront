import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadColorsComponent } from './upload-colors.component';

describe('UploadColorsComponent', () => {
  let component: UploadColorsComponent;
  let fixture: ComponentFixture<UploadColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
