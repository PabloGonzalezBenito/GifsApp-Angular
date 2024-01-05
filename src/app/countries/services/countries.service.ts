import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = `https://restcountries.com/v3.1`


    constructor(private http: HttpClient) { }

    searchCountryByAlphaCode(code: string): Observable<Country[]> {
        const url = `https://restcountries.com/v3.1/alpha/${code}`;
        return this.http.get<Country[]>(url)
            .pipe(catchError(() => of([])));
    }

    searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.http.get<Country[]>(url)
            //La funcionalidad de este pipe consiste en manejar los errores
            //en caso de que el usuario introduzca un termino de busqueda
            //que no se encuentre. En ese caso, queremos que el observable retorne un array vacío 
            .pipe(
                //Si sucede un error, regresa el argumento del of
                //(en este caso, un array vacío)
                catchError(() => of([]))
            );
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `https://restcountries.com/v3.1/name/${term}?fullText=true`;
        return this.http.get<Country[]>(url)
            .pipe(catchError(() => of([])))
            ;

    }

    searchRegion(region: string): Observable<Country[]> {
        const url = `https://restcountries.com/v3.1/region/${region}`;
        return this.http.get<Country[]>(url)
            .pipe(catchError(() => of([])))
            ;
    }

}