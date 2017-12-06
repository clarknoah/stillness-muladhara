import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

//services
//import {ApiService} from './service/api.service';

//UI Modules

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
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
  MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
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
    MatTabsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
