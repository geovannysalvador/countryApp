import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'cpuntries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {

  public countries:Country[] = [];
  public isLoading:Boolean = false;
  public initialValue:string = '';

  constructor( private countryServices:CountryService ){}

  ngOnInit(): void {
    this.countries = this.countryServices.cacheStore.byCountries.countries;
    this.initialValue = this.countryServices.cacheStore.byCountries.termBusqueda;
  }

  searchCountry(term:string):void{
    this.isLoading = true;
    this.countryServices.searchCountry(term)
    .subscribe(countries =>{
      this.countries = countries;
      this.isLoading = false;
    })
  }

}
