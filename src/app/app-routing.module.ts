import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { ParticipantFormComponent } from './participant-form/participant-form.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { AuthGuard } from './helpers/auth-guard';
import { LoginComponent } from './login/login.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'event-list', component: EventListComponent },
  {
    path: 'participant-list',
    component: ParticipantListComponent,
  },
  {
    path: 'register-participant',
    component: ParticipantFormComponent,
  },
  {
    path: 'update-participant/:particpantId',
    component: ParticipantFormComponent,
  },
  {
    path: 'view-participant-details',
    component: ParticipantDetailsComponent,
  },
  {
    path: 'event-list',
    component: EventListComponent,
  },
  {
    path: 'create-event',
    component: EventFormComponent,
  },
  {
    path: 'update-event/:eventId',
    component: EventFormComponent,
  },
  {
    path: 'view-event-details/:eventId',
    component: EventDetailsComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
