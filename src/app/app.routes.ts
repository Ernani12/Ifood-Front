import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './home/home';
import { authGuard } from './guards/auth-guard';
import { App } from './app';
import { IndexComponent } from './index';

export const routes: Routes = [
    { path: '', component: IndexComponent }, // 👈 página inicial
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
];