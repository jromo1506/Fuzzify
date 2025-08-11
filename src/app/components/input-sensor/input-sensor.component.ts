import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { SensorDataService } from '../../services/sensor-data.service';


@Component({
  selector: 'app-input-sensor',
  imports: [CommonModule, MatSliderModule, MatIconModule, MatSelectModule],
  templateUrl: './input-sensor.component.html',
  styleUrl: './input-sensor.component.scss'
})
export class InputSensorComponent {
  temperatura = 20;
  humedad = 50;
  viento = 5;

  constructor(private sensorDataService:SensorDataService){

  }

  onTemperaturaChange(event: Event) {
    this.temperatura = +(event.target as HTMLInputElement).value;
    this.sensorDataService.setTemperature(this.temperatura);
  }

  onHumedadChange(event: Event) {
    this.humedad = +(event.target as HTMLInputElement).value;
    this.sensorDataService.setHumidity(this.humedad);
  }

  onVientoChange(event: Event) {
    this.viento = +(event.target as HTMLInputElement).value;
    this.sensorDataService.setWind(this.viento);
  }

  tempCounter(event:Event){
     this.temperatura = +(event.target as HTMLInputElement).value;
  }

  humCounter(event:Event){
  this.humedad = +(event.target as HTMLInputElement).value;
  }

  windCounter(event:Event){
  this.viento = +(event.target as HTMLInputElement).value;
  }







}
