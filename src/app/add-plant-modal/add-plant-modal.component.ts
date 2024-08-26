import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country/country.service';
import { Country, CreatePlantRequest } from '../models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantService } from '../services/plant/plant.service';

@Component({
  selector: 'app-add-plant-modal',
  templateUrl: './add-plant-modal.component.html',
  styleUrl: './add-plant-modal.component.css'
})
export class AddPlantModalComponent implements OnInit {
  showModal: boolean = false;
  countries: Country[] = [];
  plantForm!: FormGroup;

  constructor(private plantService:PlantService, private countryService: CountryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
    this.plantForm = this.fb.group({
      name: [''],
      country: ['']
    });
  }

  createPlant(): void {
    if (this.plantForm.valid) {
      const plantRequest: CreatePlantRequest = {
        name: this.capitalizeFirstLetter(this.plantForm.value.name),
        country: this.plantForm.value.country.name};
        this.plantService.createPlant(plantRequest).subscribe(
          response => {
            alert("Planta creada con éxito"); 
            console.log('Planta creada con éxito', response);
            this.closeModal();
          },
          error => {
            console.error('Error al crear la planta', error);
            alert("Nombre de la planta ya existente por favor ingrese otro"); 
          }
        );
      }
      else{
        console.log('formulario invalido');
        
      }
    }

    capitalizeFirstLetter(string: string): string {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.plantForm.reset();
    this.showModal = false;
  }


}
