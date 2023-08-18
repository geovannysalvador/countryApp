import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public capital:Country[] = [];
  public isLoading:Boolean = false;
  public initialValue:string = '';

  constructor( private countryServices:CountryService ){}

  ngOnInit(): void {
    this.capital = this.countryServices.cacheStore.byCapital.countries;
    this.initialValue = this.countryServices.cacheStore.byCapital.termBusqueda;
  }

  searchByCapital(term:string):void{
    this.isLoading = true;
    this.countryServices.searchCapytal(term)
    .subscribe(capital =>{
      this.capital = capital;
      this.isLoading = false;
    })
  }

}
