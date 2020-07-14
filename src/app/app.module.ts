import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import {MaterialModulesAndElements} from './material.module';

import { AppRoutingModule, routingComponents } from './app-routing.module';

@NgModule({
  imports:      [ 
    BrowserModule, FormsModule, ReactiveFormsModule,
    MaterialModulesAndElements, BrowserAnimationsModule,
    HttpClientModule, AppRoutingModule,

     ],
  declarations: [ AppComponent, routingComponents ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
