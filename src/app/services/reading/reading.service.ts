import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Reading } from '../../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
  private apiUrl= environment.apiUrl

  constructor(private http:HttpClient) { }

  getAllReadings(): Observable<Reading[]>{
     return this.http.get<Reading[]>(this.apiUrl+'/api/readings/get-all').pipe(
      map((readings: Reading[]) => this.formatReadings(readings))
    );
  }

  private formatReadings(readings: Reading[]): Reading[] {
    return readings.map(reading => {
      const words = reading.name.replace(/_/g, ' ').toLowerCase().split(' ');
      const formattedWords = words.map(word => {
        if (word === 'ok') {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return {
        ...reading,
        name: formattedWords.join(' ')
      };
    });
}
}
