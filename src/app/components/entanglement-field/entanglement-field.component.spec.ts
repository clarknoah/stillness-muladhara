import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntanglementFieldComponent } from './entanglement-field.component';

describe('EntanglementFieldComponent', () => {
  let component: EntanglementFieldComponent;
  let fixture: ComponentFixture<EntanglementFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntanglementFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntanglementFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
