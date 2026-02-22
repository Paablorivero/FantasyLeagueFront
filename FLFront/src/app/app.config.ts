import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
<<<<<<< HEAD
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
=======
import {provideRouter, withInMemoryScrolling, withRouterConfig} from '@angular/router';
>>>>>>> Feature-UserSettingsPage

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
<<<<<<< HEAD
    provideRouter(routes),
    provideHttpClient(),
=======
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'top'}))
>>>>>>> Feature-UserSettingsPage
  ]
};
