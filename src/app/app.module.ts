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
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WebDevelopmentComponent } from './components/web-development/web-development.component';
import { CourseComponent } from './components/course/course.component';
import { LoginComponent } from './components/login/login.component';
import {MdMenuModule} from 'md-menu/menu';

////////////////////////////////
import {A11yModule} from '@angular/cdk/a11y';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { AboutComponent } from './components/about/about.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { QuestionsComponent } from './components/admin/dashboard-items/questions/questions.component';

import { AddPathComponent } from './components/admin/dashboard-items/add-path/add-path.component';
import { UsersComponent } from './components/admin/dashboard-items/users/users.component';
import { ViewPathComponent } from './components/admin/dashboard-items/view-path/view-path.component';
import { ViewCoursesComponent } from './components/admin/dashboard-items/view-courses/view-courses.component';
import { AddCoursesComponent } from './components/admin/dashboard-items/add-courses/add-courses.component';
import { AddQuestionsComponent } from './components/admin/dashboard-items/add-questions/add-questions.component';
import { PieChartComponent } from './components/admin/admin-dashboard/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/admin/admin-dashboard/bar-chart/bar-chart.component';
import { BarChartFailSuccessComponent } from './components/admin/admin-dashboard/bar-chart-fail-success/bar-chart-fail-success.component';
import { LineChartComponent } from './components/admin/admin-dashboard/line-chart/line-chart.component';
import { AddTrackComponent } from './components/admin/dashboard-items/add-track/add-track.component';

import { CountdownModule } from 'ngx-countdown';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ViewTrackComponent } from './components/admin/dashboard-items/view-path/view-track/view-track.component';
import { EditQuestionComponent } from './components/admin/dashboard-items/add-questions/edit-question/edit-question.component';
import { EditCourseComponent } from './components/admin/dashboard-items/add-courses/edit-course/edit-course.component';
import { EditPathComponent } from './components/admin/dashboard-items/add-path/edit-path/edit-path.component';
// import {NgbdCollapseNavbar} from './collapse-navbar';


const routes: Routes =
  [

    { path: 'home', component: HomeComponent },

    { path: 'profile', component: ProfileHeaderComponent },
    { path: 'about', component: AboutComponent },
    { path: 'quiz', component: QuizComponent },

    { path: 'profile/dashboard', component: DashboardComponent },

    { path: 'profile/courses', component: CoursesComponent },
    {path:'admin/dashboard/edit/question/:questId', component:EditQuestionComponent},

    { path: 'admin/dashboard', component: AdminNavComponent, children: [
      { path:'vc', component: ViewCoursesComponent, outlet:'viewCourses'},
      { path:'ac', component: AddCoursesComponent, outlet:'addCourses'},
      { path:'db', component: AdminDashboardComponent, outlet:'dashboard'}
    ] },

    { path: 'dashboard', component: AdminDashboardComponent },


    { path: 'admin/questions', component: QuestionsComponent },
    { path: 'admin/add-path', component: AddPathComponent },
    { path: 'admin/add-path', component: AddPathComponent },
    { path: 'admin/add-track', component: AddTrackComponent },
    { path: 'admin/view-path', component: ViewPathComponent },
    { path: 'admin/add-course', component: AddCoursesComponent },
    { path: 'admin/view-course', component: ViewCoursesComponent},
    { path: 'admin/add-question', component: AddQuestionsComponent},
    { path: 'admin/view-question', component: QuestionsComponent },
    /****************************************************************** */
    { path:'admin/dashboard/edit/course/:id', component:EditCourseComponent},

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
    AboutComponent,
    QuizComponent,
    AdminNavComponent,
    AdminDashboardComponent,
    QuestionsComponent,
   
    AddPathComponent,
    UsersComponent,
    ViewPathComponent,
    ViewCoursesComponent,
    AddCoursesComponent,
    AddQuestionsComponent,
    PieChartComponent,
    BarChartComponent,
    BarChartFailSuccessComponent,
    LineChartComponent,
    AddTrackComponent,
    SpinnerComponent,
    ViewTrackComponent,
    EditQuestionComponent,
    EditCourseComponent,
    EditPathComponent

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
    MdMenuModule,
    A11yModule,
 
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    CountdownModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
