import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})

export class CountryService {

  private apiUrlBase:string ='https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( error => of([])),
      // delay(2000),
    );
  }


  searchCountryByCode(code:string):Observable<Country | null>{

    return this.http.get<Country[]>(`${this.apiUrlBase}/alpha/${code}`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0]: null),
      catchError( () => of(null))
    );

  }

  searchCapytal(termBusqueda:string):Observable<Country[]>{

    const url = `${this.apiUrlBase}/capital/${termBusqueda}`
    return this.getCountriesRequest(url);

  }

  searchCountry(termBusqueda:string):Observable<Country[]>{

    const url = `${this.apiUrlBase}/name/${termBusqueda}`
    return this.getCountriesRequest(url);
  }

  searchRegion(termBusqueda:string):Observable<Country[]>{

    const url = `${this.apiUrlBase}/region/${termBusqueda}`
    return this.getCountriesRequest(url);
  }





}
