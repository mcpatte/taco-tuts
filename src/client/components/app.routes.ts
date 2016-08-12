import { RouterConfig, provideRouter } from '@angular/router';
import { AdvancedSearchComponent } from './advancedSearch.component';
import { StudentDashboardComponent } from './student-dashboard/studentDashboard.component';
import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up/signUp.component';
import { HomeComponent } from './home.component';
import { TeacherDashboardComponent } from './teacher-dashboard';
import { SessionComponent } from './session';

const routes: RouterConfig = [
  { path: 'login',  component: LoginComponent },
  { path: 'sign-up',  component: SignUpComponent },
  { path: 'student-dash', component: StudentDashboardComponent },
  { path: 'teacher-dash', component: TeacherDashboardComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent },
  { path: 'session', component: SessionComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/student-dash' }
];

export const appRouterProviders = [
  provideRouter(routes)
];
