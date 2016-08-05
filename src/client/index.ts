import { bootstrap } from '@angular/platform-browser-dynamic';
import { App } from './containers/app.component';
import { NgRedux } from 'ng2-redux';
import { SearchActions } from './actions/search.actions';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideRouter } from '@angular/router';

import { appRouterProviders } from './components/app.routes';

bootstrap(App, [
  appRouterProviders,
  HTTP_PROVIDERS,
  NgRedux
]);
