import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  message: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // 👈 IMPORTANTE
  ) {}

  login(): void {

    if (this.loading) return;

    if (!this.username || !this.password) {
      this.message = 'Preencha usuário e senha';
      return;
    }

    this.loading = true;
    this.message = '';

    const data = {
      username: this.username,
      password: this.password
    };

    this.authService.login(data).subscribe({

      next: () => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', this.username);
        this.authService.setLogin(this.username);
        this.router.navigate(['/home']);
        this.loading = false;
      },

      error: (err) => {

        if (err.status === 401) {
          this.message = 'Usuário ou senha inválidos!';
        } else {
          this.message = 'Erro no servidor!';
        }

        this.loading = false;

        this.cdr.detectChanges(); // 👈 FORÇA ATUALIZAÇÃO
      }

    });
  }
}