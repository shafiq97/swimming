import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { ParticipantFormComponent } from './participant-form/participant-form.component';
import { AgGridModule } from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    ParticipantListComponent,
    ParticipantDetailsComponent,
    ParticipantFormComponent,
    EventListComponent,
    EventFormComponent,
    EventDetailsComponent,
    LoginComponent,
    FaqComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
