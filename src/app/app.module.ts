import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

//services
//import {ApiService} from './service/api.service';

//UI Modules

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatInputModule,
  MatDatepickerModule,
  MatTableModule,
  MatMenuModule,
  MatGridListModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatStepperModule,
  MatTabsModule} from '@angular/material';

import { ConceptFormTestignComponent } from './concept-form-testign/concept-form-testign.component';
import { ConceptFormComponent } from './components/concept-form/concept-form.component';
import { QualiaFieldComponent } from './components/qualia-field/qualia-field.component';
import { EntanglementFieldComponent } from './components/entanglement-field/entanglement-field.component';

import{DataService} from './services/data.service';
import { AtmanService } from './services/atman.service';
import { HomeComponent } from './home/home.component';
import { QuestionSpaceComponent } from './question-space/question-space.component';
import { PlaygroundComponent } from './playground/playground.component';
import { AnswerSpaceComponent } from './answer-space/answer-space.component';
import { ConceptListEditorComponent } from './components/concept-list-editor/concept-list-editor.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'conceptformtest', component: ConceptFormTestignComponent},
  {path: 'playground', component: PlaygroundComponent},
  {path: 'questionspace', component: QuestionSpaceComponent},
  {path: 'answerspace', component: AnswerSpaceComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ConceptFormTestignComponent,
    ConceptFormComponent,
    QualiaFieldComponent,
    EntanglementFieldComponent,
    HomeComponent,
    QuestionSpaceComponent,
    PlaygroundComponent,
    AnswerSpaceComponent,
    ConceptListEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ DataService, AtmanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
