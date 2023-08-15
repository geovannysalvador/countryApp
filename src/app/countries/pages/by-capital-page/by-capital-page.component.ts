import { Component } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {

  public capital:Country[] = [];

  constructor( private countryServices:CountryService ){}

  searchByCapital(term:string):void{
    this.countryServices.searchCapytal(term)
    .subscribe(capital =>{
      this.capital = capital;
    })
  }

}
