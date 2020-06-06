import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes }from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileHeaderComponent } from './components/profile/profile-header/profile-header.component';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';
import { CoursesComponent } from './components/profile/courses/courses.component';
import { ExamsComponent } from './components/profile/exams/exams.component';
import { DoughnuComponent } from './components/profile/charts/doughnu/doughnu.component';

import { ChartsModule } from 'ng2-charts';
import { CourseModalComponent } from './components/profile/course-modal/course-modal.component';
// import {NgbdCollapseNavbar} from './collapse-navbar';


const routes:Routes = 
[
 
  {  path:'',  component : HomeComponent  },

  { path:'profile', component: ProfileHeaderComponent},

  { path:'profile/dashboard', component: DashboardComponent},

  { path:'profile/courses', component: CoursesComponent}

  // {  path:'**',  component : HomeComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ProfileHeaderComponent,
    DashboardComponent,
    CoursesComponent,
    ExamsComponent,
    DoughnuComponent,
    CourseModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
