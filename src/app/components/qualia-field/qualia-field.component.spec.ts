import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiaFieldComponent } from './qualia-field.component';

describe('QualiaFieldComponent', () => {
  let component: QualiaFieldComponent;
  let fixture: ComponentFixture<QualiaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualiaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualiaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
