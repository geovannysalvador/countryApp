import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {

  public region:Country[] = [];

  constructor( private countryServices:CountryService ){}

  searchRegion(term:string):void{
    this.countryServices.searchRegion(term)
    .subscribe(region =>{
      this.region = region;
    })
  }

}
