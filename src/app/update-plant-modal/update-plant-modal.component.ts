import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Plant, UpdatePlantRequest } from '../models';
import { PlantService } from '../services/plant/plant.service';

@Component({
  selector: 'app-update-plant-modal',
  templateUrl: './update-plant-modal.component.html',
  styleUrl: './update-plant-modal.component.css'
})
export class UpdatePlantModalComponent implements OnInit{
  showModal: boolean = false;
  plantForm!: FormGroup;
 plant: any;

  constructor(private plantService:PlantService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.plantForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      okCount: [''],
      mediumAlertCount: [''],
      redAlertCount: ['']
    });
  }

  updatePlant(): void {
    if (this.plantForm.valid) {
      const plantRequest: UpdatePlantRequest = {
        id: this.plantForm.get('id')?.value,
        name: this.plantForm.get('name')?.value,
        country: this.plantForm.get('country')?.value,
        okCount: this.plantForm.value.okCount,
        mediumAlertCount: this.plantForm.value.mediumAlertCount,
        redAlertCount: this.plantForm.value.redAlertCount,};
        console.log(plantRequest);
        this.plantService.updatePlant(plantRequest).subscribe(
          response => {
            alert("Planta modificada con éxito"); 
            console.log('Planta modificada con éxito', response);
            this.closeModal();
          },
          error => {
            console.error('Error al modificar la planta', error);
            alert("Error al modificar la planta"); 
          }
        );
      }
      else{
        console.log('formulario invalido');
        
      }
    }


  openModal(plant:Plant) {
    console.log(plant)
    this.plant=plant
    this.showModal = true;
    this.plantForm.patchValue({
      id: plant.id,
      name: plant.name,
      country: plant.country.name,
    });
  }

  closeModal() {
    this.plantForm.reset();
    this.showModal = false;
  }


}
