import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl:string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]>{

    return this.http.get<Hero[]>(`${ this.baseUrl}/heroes`);
  }

  //id que no existe, regresa undefined
  getHeroById(id: string): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      catchError( error => of(undefined) ) // of -> es una forma de crear observables, basado en el valor que le
                                          // pasamos. En este caso regresamos un observable que retorna undefined.
    )
  }

  getSuggestions( query: string ): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

}
