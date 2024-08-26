import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AddPlantModalComponent } from '../../add-plant-modal/add-plant-modal.component';
import { PlantService } from '../../services/plant/plant.service';
import { Plant } from '../../models';
import { UpdatePlantModalComponent } from '../../update-plant-modal/update-plant-modal.component';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit, AfterViewInit{
  @ViewChild('updatePlantModal') updatePlantModal!: UpdatePlantModalComponent;
  @ViewChild('addPlant') addPlantModal!: AddPlantModalComponent;
  
  selectedPlant!: Plant;
  plants: Plant[] = [];

  constructor(private plantService: PlantService,) { }

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe((data) => {
      this.plants = data
      console.log(this.plants)
    });
  }

  ngAfterViewInit(): void {
    console.log(this.updatePlantModal);
  }


  updatePlant(plant: Plant) {
    this.updatePlantModal.openModal(plant);
  }
  addPlant() {
    console.log(this.addPlant);
    this.addPlantModal.openModal();
  }
}
