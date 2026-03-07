import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './home/home';
import { authGuard } from './guards/auth-guard';
import { App } from './app';
import { IndexComponent } from './index';
import { RegisterComponent } from './register/register';
import { PizzaListComponent } from './pages/pizza-list/pizza-list';
import { PedidoComponent } from './pages/pedido/pedido';

export const routes: Routes = [
    { path: '', component: IndexComponent }, // 👈 página inicial
    { path: 'register', component: RegisterComponent }, // 👈 rota do registro
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'pizzas', component: PizzaListComponent },
    { path: 'pedido', component: PedidoComponent, canActivate: [authGuard] },
];