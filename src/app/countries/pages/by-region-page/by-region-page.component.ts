import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {

  public region:Country[] = [];
  public regions:Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania", "Central America",];
  public selectedRegion?:Region;
  public isLoading:Boolean = false;

  constructor( private countryServices:CountryService ){}

  ngOnInit(): void {
    this.region = this.countryServices.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryServices.cacheStore.byRegion.region;
  }

  searchRegion(term:Region):void{
    this.isLoading = true;
    this.selectedRegion = term;
    this.countryServices.searchRegion(term)
    .subscribe(region =>{
      this.region = region;
      this.isLoading = false;
    })
  }

}
