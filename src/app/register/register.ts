import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html', // 👈 usar arquivo externo
})
export class RegisterComponent {
  username = '';
  password = '';
  endereco = '';
  loading = false;
  message = '';

  constructor(private http: HttpClient) {}


  register() {

  if (this.loading) return; // 🔥 trava múltiplos envios

  this.loading = true;
  this.message = '';

  this.http.post('http://localhost:8080/auth/register', {
    username: this.username,
    password: this.password,
    endereco: this.endereco
  }, { responseType: 'text' })
  .subscribe({
    next: res => {
      this.message = res;
      this.loading = false;
    },
    error: err => {
      this.message = err.error;
      this.loading = false;
    }
  });
}
}