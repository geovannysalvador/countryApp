import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})

export class CountryService {

  private apiUrlBase:string ='https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }


  searchCapytal(termBusqueda:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrlBase}/capital/${termBusqueda}`)
    .pipe(
      catchError( error => of([]))
    );
  }

  searchCountry(termBusqueda:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrlBase}/name/${termBusqueda}`)
    .pipe(
      catchError( error => of([]))
    );
  }

  searchRegion(termBusqueda:string):Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrlBase}/region/${termBusqueda}`)
    .pipe(
      catchError( error => of([]))
    );
  }



}
