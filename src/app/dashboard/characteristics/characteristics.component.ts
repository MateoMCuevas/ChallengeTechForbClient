import { Component, OnInit } from '@angular/core';
import { CharacteristicService } from '../../services/characteristic/characteristic.service';
import { Characteristic } from '../../models';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.component.html',
  styleUrl: './characteristics.component.css'
})
export class CharacteristicsComponent implements OnInit{
  characteristics: Characteristic[] = [];

  constructor(private characteristicService:CharacteristicService){}

  ngOnInit(): void {
    this.characteristicService.getAllCharacteristics().subscribe((data)=>{
      this.characteristics=data;
      console.log(this.characteristics)
    })
  }

  getIcon(name: string): any {
    switch (name) {
      case 'Temperatura':
        return 'assets/CharacteristicsIcons/TemperatureIcon.svg'; 
      case 'Presión':
        return 'assets/CharacteristicsIcons/PressureIcon.svg';
      case 'Viento':
        return 'assets/CharacteristicsIcons/WindIcon.svg';
      case 'Niveles':
        return 'assets/CharacteristicsIcons/LevelsIcon.svg';
      case 'Energía':
        return 'assets/CharacteristicsIcons/EnergyIcon.svg';
      case 'Tensión':
        return 'assets/CharacteristicsIcons/TensionIcon.svg';
      case 'Monóxido de carbono':
        return 'assets/CharacteristicsIcons/COIcon.svg';
      case 'Otros gases':
        return 'assets/CharacteristicsIcons/OtherGasesIcon.svg';
    }
  }
}
