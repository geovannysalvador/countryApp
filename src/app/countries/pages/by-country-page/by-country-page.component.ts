import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'cpuntries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {

  public countries:Country[] = [];

  constructor( private countryServices:CountryService ){}

  searchCountry(term:string):void{
    this.countryServices.searchCountry(term)
    .subscribe(countries =>{
      this.countries = countries;
    })
  }

}
