// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  public isLoggedIn = false;
  public username = '';

  constructor(private http: HttpClient) {}

login(data: any) {
  return this.http.post(
    `${this.apiUrl}/login`,
    data,
    {
      responseType: 'text'
    }
  );
}
  setLogin(username: string) {
    this.isLoggedIn = true;
    this.username = username;
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
  }
}