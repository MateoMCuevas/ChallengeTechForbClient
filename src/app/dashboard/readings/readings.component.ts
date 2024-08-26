import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingService } from '../../services/reading/reading.service';
import { Reading } from '../../models';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrl: './readings.component.css'
})
export class ReadingsComponent implements OnInit {
  readings: Reading[] = [];

  constructor(
    private reandingService: ReadingService
  ) { }

  ngOnInit(): void {
    this.reandingService.getAllReadings().subscribe((data) => {
      this.readings = data;
    });
  }

  getIcon(name: string): any {
    switch (name) {
      case 'Lecturas OK':
        return 'assets/ReadingsIcons/ReadingIcon.svg';
      case 'Alertas Medias':
        return 'assets/ReadingsIcons/MediumAlertIcon.svg';
      case 'Alertas Rojas':
        return 'assets/ReadingsIcons/RedAlertIcon.svg';
      case 'Sensores Deshabilitados':
        return 'assets/ReadingsIcons/SensorDisabledIcon.svg';
    }
  }
}
