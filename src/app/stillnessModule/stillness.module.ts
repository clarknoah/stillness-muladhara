import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptFormComponent } from '../components/concept-form/concept-form.component';
import { QualiaFieldComponent } from '../components/qualia-field/qualia-field.component';
import { ConceptListEditorComponent } from '../components/concept-list-editor/concept-list-editor.component';
import { EntanglementFieldComponent } from '../components/entanglement-field/entanglement-field.component';
import { DataService } from '../services/data.service';
import { AtmanService } from '../services/atman.service';
import { HomeComponent } from '../home/home.component';
import { QuestionSpaceComponent } from '../question-space/question-space.component';
import { AnswerSpaceComponent } from '../answer-space/answer-space.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConceptForm } from '../models/concept-form.model';
import { Qualia } from '../models/qualia.model';
import { Entanglement } from '../models/entanglement.model';
import { SubmissionPayload } from '../models/submission-payload.model';

import {
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatTabsModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatListModule,
  MatTooltipModule,
  MatTableModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule
  ],
  declarations: [
    ConceptFormComponent,
    QualiaFieldComponent,
    EntanglementFieldComponent,
    QuestionSpaceComponent,
    AnswerSpaceComponent,
    ConceptListEditorComponent
  ],
  providers:[
    DataService,
    AtmanService
  ],
  exports: [
    ConceptFormComponent,
    QualiaFieldComponent,
    EntanglementFieldComponent,
    QuestionSpaceComponent,
    AnswerSpaceComponent,
    ConceptListEditorComponent
  ]
})
export class StillnessModule { }
