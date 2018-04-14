import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppService } from './app.service';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add', component: AddemployeeComponent },
  { path: 'about', component: AboutComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AddemployeeComponent,
    DashboardComponent,
    AboutComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
