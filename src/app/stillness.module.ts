import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptFormComponent } from './components/concept-form/concept-form.component';
import { QualiaFieldComponent } from './components/qualia-field/qualia-field.component';
import { EntanglementFieldComponent } from './components/entanglement-field/entanglement-field.component';
import { DataService } from './services/data.service';
import { AtmanService } from './services/atman.service';
import { HomeComponent } from './home/home.component';
import { QuestionSpaceComponent } from './question-space/question-space.component';
import { PlaygroundComponent } from './playground/playground.component';
import { AnswerSpaceComponent } from './answer-space/answer-space.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ConceptFormComponent,
    QualiaFieldComponent,
    EntanglementFieldComponent,
    DataService,
    AtmanService,
    QuestionSpaceComponent,
    AnswerSpaceComponent
  ],
  exports: [
    ConceptFormComponent,
    QualiaFieldComponent,
    EntanglementFieldComponent,
    DataService,
    AtmanService,
    QuestionSpaceComponent,
    AnswerSpaceComponent
  ]
})
export class StillnessModule { }
