import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, forkJoin, map, Observable, switchMap, throwError } from 'rxjs';
import { Plant, CreatePlantRequest, UpdatePlantRequest } from '../../models';
import { environment } from '../../../environments/environment';
import { CountryService } from '../country/country.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private countryService: CountryService) { }

  getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl + '/api/plants/get-all').pipe(
      switchMap(plants => {
        const countryRequests = plants.map(plant =>
          this.countryService.getCountryByName(plant.country).pipe(
            map(country => ({
              ...plant,
              country: {
                name: country.name,
                flagUrl: country.flagUrl
              }
            }))
          )
        );
        return forkJoin(countryRequests);
      })
    );
  }

  createPlant(createPlantRequest: CreatePlantRequest): Observable<any> {
     return this.http.post<any>(this.apiUrl + '/api/plants/create', createPlantRequest).pipe(
      catchError(error => {
        let errorMessage = 'Ocurrió un error al crear la planta';
        if (error.status === 409) {
          errorMessage = error.error; // Mensaje personalizado desde el backend
        }
        return throwError(errorMessage);
      })
    );
    }

    updatePlant(updatePlantRequest: UpdatePlantRequest): Observable<any> {
      return this.http.put<any>(this.apiUrl + '/api/plants/update', updatePlantRequest).pipe(
       catchError(error => {
         let errorMessage = 'Ocurrió un error al modificar la planta';
         if (error.status === 409) {
           errorMessage = error.error;
         }
         return throwError(errorMessage);
       })
     );
     }
}
