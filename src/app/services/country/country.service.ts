import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl + '/all').pipe(
      map((countries: any[]) =>
        countries.map(country => ({
          name: country.name.common,
          flagUrl: country.flags.svg
        }))
      )
    );
  }

  getCountryByName(country: Country): Observable<Country> {
    return this.http.get<any>(this.apiUrl + '/name/' + country + '?fullText=true').pipe(map(response => {
      if (response && response.length > 0) {
        const countryData = response[0];
        return {
          name: countryData.name.common,
          flagUrl: countryData.flags.svg
        } as Country;
      } else {
        throw new Error('Country not found');
      }
    })
    );
  }

}
