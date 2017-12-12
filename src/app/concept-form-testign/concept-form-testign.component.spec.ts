import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptFormTestignComponent } from './concept-form-testign.component';

describe('ConceptFormTestignComponent', () => {
  let component: ConceptFormTestignComponent;
  let fixture: ComponentFixture<ConceptFormTestignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptFormTestignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptFormTestignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
