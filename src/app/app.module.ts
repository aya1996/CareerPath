import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileHeaderComponent } from './components/profile/profile-header/profile-header.component';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';
import { CoursesComponent } from './components/profile/courses/courses.component';
import { ExamsComponent } from './components/profile/exams/exams.component';
import { DoughnuComponent } from './components/profile/charts/doughnu/doughnu.component';
import { ChartsModule } from 'ng2-charts';
import { CourseModalComponent } from './components/profile/course-modal/course-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesListComponent } from './components/courses/courses-list/courses-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WebDevelopmentComponent } from './pages/web-development/web-development.component';
import { CourseComponent } from './pages/course/course.component';
import { LoginComponent } from './pages/login/login.component';
import {MdMenuModule} from 'md-menu/menu';
// import {NgbdCollapseNavbar} from './collapse-navbar';


const routes: Routes =
  [

    { path: '', component: HomeComponent },

    { path: 'profile', component: ProfileHeaderComponent },

    { path: 'profile/dashboard', component: DashboardComponent },

    { path: 'profile/courses', component: CoursesComponent },

    { path: 'courses-list', component: CoursesListComponent },
    { path: 'courses-modal', component: CourseModalComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'web', component: WebDevelopmentComponent },
    { path: 'login', component: LoginComponent },
    { path: 'course', component: CourseComponent },
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
    CourseModalComponent,
    LoginComponent,
    RegisterComponent,
    WebDevelopmentComponent,
    CourseComponent,
    CoursesListComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    AngularFontAwesomeModule,
    MdMenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
