import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule } from "@angular/forms"

import { AppComponent } from './app.component';
import { OperationComponent } from './operation/operation.component';

@NgModule({
  declarations: [
    AppComponent,
    OperationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule ,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
