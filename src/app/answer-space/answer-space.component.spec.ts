import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSpaceComponent } from './answer-space.component';

describe('AnswerSpaceComponent', () => {
  let component: AnswerSpaceComponent;
  let fixture: ComponentFixture<AnswerSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
