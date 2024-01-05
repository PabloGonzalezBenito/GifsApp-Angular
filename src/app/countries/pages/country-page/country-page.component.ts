import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  //La clase ActivatedRoute nos permite acceder a los params de la URL
  constructor(private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService) { }

  ngOnInit(): void {
    //los params del objeto activatedRoute nos viene mediente un observable
    this.activatedRoute.params.subscribe(({ id }) => {
      console.log({ params: id })
      this.countriesService.searchCountryByAlphaCode(id).subscribe(country => {
        console.log(country);

      })

    });
  }
}
