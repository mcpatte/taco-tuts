import { RouterConfig, provideRouter } from '@angular/router';
import { AdvancedSearch } from './advancedSearch.component';
import { StudentDashboard } from './studentDashboard.component';
import { Login } from './login.component';
import { TeacherDashboard } from './teacherDashboard.component';
import { App } from '../containers/app.component';


const routes: RouterConfig = [
  { path: '',  component: App }, 
  { path: 'login',  component: Login },
  { path: 'student-dash', component: StudentDashboard },
  { path: 'teacher-dash', component: TeacherDashboard },
  { path: 'advanced-search', component: AdvancedSearch }
];

export const appRouterProviders = [
    provideRouter(routes)
];