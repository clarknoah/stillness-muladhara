import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptListEditorComponent } from './concept-list-editor.component';

describe('ConceptListEditorComponent', () => {
  let component: ConceptListEditorComponent;
  let fixture: ComponentFixture<ConceptListEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptListEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
