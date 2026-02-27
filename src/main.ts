// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app/app.routes';
import { LoginComponent } from './app/pages/login/login';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
        provideHttpClient(withFetch()) // 👈 coloque isso

  ]
})
.catch(err => console.error(err));