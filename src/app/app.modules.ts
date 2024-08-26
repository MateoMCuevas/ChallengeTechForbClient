import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlantsComponent } from './dashboard/plants/plants.component';
import { CharacteristicsComponent } from './dashboard/characteristics/characteristics.component';
import { ReadingsComponent } from './dashboard/readings/readings.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AddPlantModalComponent } from "./add-plant-modal/add-plant-modal.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthJwtInterceptorService } from './services/auth/auth-jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdatePlantModalComponent } from './update-plant-modal/update-plant-modal.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    PlantsComponent,
    CharacteristicsComponent,
    ReadingsComponent,
    LoginComponent,
    AddPlantModalComponent,
    UpdatePlantModalComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatFormFieldModule
],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }