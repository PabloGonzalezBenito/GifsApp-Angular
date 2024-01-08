import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = `https://restcountries.com/v3.1`

    public cacheStore: CacheStore = {
        byCapital: {
            term: '',
            countries: []
        },
        byCountries: {
            term: '',
            countries: []
        },
        byRegion: {
            region: '',
            countries: []
        }
    }

    constructor(private http: HttpClient) {
        //Esto es lo que quiero que se ejecute cuando se inicializa el servicio
        this.loadFromLocalStorage();
     }


    private saveToLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
    }

    private loadFromLocalStorage() {
        if (localStorage.getItem('cacheStore')) {
            this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
        }
        return;
    }

    private getCountriesRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url)
            //La funcionalidad de este pipe consiste en manejar los errores
            //en caso de que el usuario introduzca un termino de busqueda
            //que no se encuentre. En ese caso, queremos que el observable retorne un array vacío 
            .pipe(
                //Si sucede un error, regresa el argumento del of
                //(en este caso, un array vacío)
                catchError(() => of([])),
                delay(500) //Se incluye un delay de 0.5 segundos para comprobar el funcionamiento del spinner
            );
    }



    searchCountryByAlphaCode(code: string): Observable<Country | null> {
        const url = `https://restcountries.com/v3.1/alpha/${code}`;
        return this.http.get<Country[]>(url)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
            );
    }

    searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap((countries) => this.cacheStore.byCapital = { term, countries }),
                tap(() => this.saveToLocalStorage())
            )
            ;
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `https://restcountries.com/v3.1/name/${term}?fullText=true`;
        return this.getCountriesRequest(url)
            .pipe(
                tap(countries => this.cacheStore.byCountries = { term, countries }),
                tap(() => this.saveToLocalStorage())
            )
            ;
    }

    searchRegion(region: Region): Observable<Country[]> {
        const url = `https://restcountries.com/v3.1/region/${region}`;
        return this.getCountriesRequest(url)
            .pipe(
                tap((countries) => this.cacheStore.byRegion = { region, countries }),
                tap(() => this.saveToLocalStorage())
            )
            ;
    }

}