import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  //La clase ActivatedRoute nos permite acceder a los params de la URL
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //los params del objeto activatedRoute nos viene mediente un observable
    this.activatedRoute.params
      .pipe(
        //switchMap nos regresa un nuevo observable, pero transforma la informacion original
        //En este caso, nos evita tener que hacer un subscribe dentro de otro subscribe
        switchMap(({ id }) => this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe((country) => {

        if (!country) {
          return this.router.navigateByUrl('');
        }
        return this.country = country;
      });
  }

}
