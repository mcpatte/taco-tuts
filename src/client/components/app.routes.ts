import { RouterConfig, provideRouter } from '@angular/router';
import { AdvancedSearchComponent } from './advanced-search';
import { StudentDashboardComponent } from './student-dashboard/studentDashboard.component';
import { LoginComponent } from './login';
import { SignUpComponent } from './sign-up';
import { HomeComponent } from './home';
import { TeacherDashboardComponent } from './teacher-dashboard';
import { SessionComponent } from './session';
import { SessionEndComponent } from './session-end';
import { TeacherViewComponent } from './teacher-view';


const routes: RouterConfig = [
  { path: 'login',  component: LoginComponent },
  { path: 'sign-up',  component: SignUpComponent },
  { path: 'student-dash', component: StudentDashboardComponent },
  { path: 'teacher-dash', component: TeacherDashboardComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent },
  { path: 'session', component: SessionComponent },
  { path: 'session-end', component: SessionEndComponent },
  { path: 'home', component: HomeComponent },
  { path: 'teacher-view', component: TeacherViewComponent },
  { path: '**', redirectTo: '/home' }
];

export const appRouterProviders = [
  provideRouter(routes)
];
