import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, map, of, tap, catchError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;


  constructor(private http: HttpClient) { }

  get currentUser():User | undefined {
    if(!this.user) return undefined;
    // Si usaramos el return this.user, esto le daría acceso al objeto, y en javascript
    // -todo los objetos pasan por referencia.
    // Para solucionar eso, Usamos el structuredClone (deep clone)

    return structuredClone(this.user);
  }


  login(email: string, password: string):Observable<User>{

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user => this.user = user),
      tap( user => localStorage.setItem('token','werserfwer.werwerwer.sdfsdfghdfg')),
    )
  }


  checkAuthentication(): Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      map(user => !!user), // con !! (doble negación) nos aseguramos de recibir un valor booleano
      catchError( error => of(false) )
    )
  }



  logout(): void{
    this.user = undefined;
    localStorage.clear();
  }

}
