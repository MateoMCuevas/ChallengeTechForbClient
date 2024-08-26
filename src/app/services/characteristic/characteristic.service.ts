import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Characteristic } from '../../models';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {
  private apiUrl=environment.apiUrl

  constructor(private http:HttpClient) { }

  getAllCharacteristics(): Observable<Characteristic[]>{
    return this.http.get<Characteristic[]>(this.apiUrl+'/api/characteristics/get-all');
  }
}
