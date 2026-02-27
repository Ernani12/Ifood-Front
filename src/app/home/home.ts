// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // ✅ IMPORTANTE
  template: `
    <h2>🍕 Bem-vindo à Pizzaria IFood!</h2>

    <p *ngIf="auth.isLoggedIn">
      Você está logado como {{ auth.username }}!
    </p>

    <p *ngIf="!auth.isLoggedIn">
      Você não está logado.
    </p>
  `
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}