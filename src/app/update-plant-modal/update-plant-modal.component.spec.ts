import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlantModalComponent } from './update-plant-modal.component';

describe('UpdatePlantModelComponent', () => {
  let component: UpdatePlantModalComponent;
  let fixture: ComponentFixture<UpdatePlantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePlantModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePlantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
