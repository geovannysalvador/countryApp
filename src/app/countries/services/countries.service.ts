import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})

export class CountryService {

  private apiUrlBase:string ='https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital: { termBusqueda: '', countries: [] },
    byCountries: { termBusqueda: '', countries: [] },
    byRegion: { region: '', countries: [] }
}

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private saveLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')!);
  }

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
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {termBusqueda, countries}),
      tap(()=> this.saveLocalStorage())
    );

  }

  searchCountry(termBusqueda:string):Observable<Country[]>{

    const url = `${this.apiUrlBase}/name/${termBusqueda}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {termBusqueda, countries}),
      tap(()=> this.saveLocalStorage())
    );
  }

  searchRegion(region:Region):Observable<Country[]>{

    const url = `${this.apiUrlBase}/region/${region}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region, countries}),
      tap(()=> this.saveLocalStorage())
    );
  }





}
