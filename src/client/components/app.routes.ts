import { RouterConfig, provideRouter } from '@angular/router';
import { AdvancedSearchComponent } from './advancedSearch.component';
import { StudentDashboardComponent } from './studentDashboard.component';
import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up/signUp.component';
import { TeacherDashboardComponent } from './teacherDashboard.component';

const routes: RouterConfig = [
  { path: 'login',  component: LoginComponent },
  { path: 'sign-up',  component: SignUpComponent },
  { path: 'student-dash', component: StudentDashboardComponent },
  { path: 'teacher-dash', component: TeacherDashboardComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent },
  { path: '**', redirectTo: '/student-dash' }

];

export const appRouterProviders = [
    provideRouter(routes)
];
