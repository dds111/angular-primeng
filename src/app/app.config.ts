import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura  from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';




import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideHttpClient(),
    provideAnimationsAsync(), 
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
