import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './home/home';
import { authGuard } from './guards/auth-guard';
import { App } from './app';
import { IndexComponent } from './index';
import { RegisterComponent } from './register/register';

export const routes: Routes = [
    { path: '', component: IndexComponent }, // 👈 página inicial
    { path: 'register', component: RegisterComponent }, // 👈 rota do registro
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
];