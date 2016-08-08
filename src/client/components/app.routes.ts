import { RouterConfig, provideRouter } from '@angular/router';
import { MenuBarComponent } from './menuBar.component'
import { AdvancedSearch } from './advancedSearch.component';
import { StudentDashboard } from './studentDashboard.component';
import { Login } from './login.component';
import { TeacherDashboard } from './teacherDashboard.component';
import { App } from '../containers/app.component';



const routes: RouterConfig = [
  { path: '', component: StudentDashboard },
  { path: 'login',  component: Login },
  { path: 'student-dash', component: StudentDashboard },
  { path: 'teacher-dash', component: TeacherDashboard },
  { path: 'advanced-search', component: AdvancedSearch },
  { path: '**', redirectTo: '' }

];


export const appRouterProviders = [
    provideRouter(routes)
];