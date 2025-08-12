import { Component } from '@angular/core';
import { ComfortDisplayComponent } from '../../components/comfort-display/comfort-display.component';
import { InputEvaluatorComponent } from '../../components/input-evaluator/input-evaluator.component';
import { InputSensorComponent } from '../../components/input-sensor/input-sensor.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ForecastTableComponent } from '../../components/forecast-table/forecast-table.component';
import Swal from 'sweetalert2';
import { SensorDataService } from '../../services/sensor-data.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-fuzzifier',
  imports: [ComfortDisplayComponent,InputEvaluatorComponent,InputSensorComponent,NavbarComponent,ForecastTableComponent],
  templateUrl: './fuzzifier.component.html',
  styleUrl: './fuzzifier.component.scss'
})
export class FuzzifierComponent {
  

  temp:number=0;
  humidity:number=0;
  wind:number=0;

  constructor(private sensorDataService:SensorDataService,private localStorageService:LocalStorageService) {}  // inject service here


  ngOnInit(){
    
      this.sensorDataService.temp$.subscribe((t:any) => {
        this.temp = t;
      });

      this.sensorDataService.humidity$.subscribe((h:any) => {
        this.humidity = h;
      });

      this.sensorDataService.wind$.subscribe((w:any) => {
        this.wind = w;
      });
  }
  guardarRegistro(){
    this.localStorageService.saveData({temp:this.temp,humidity:this.humidity,wind:this.wind})
    Swal.fire('Hecho', 'Datos guardados', 'success');
  }

  clearRegistro(){
    this.localStorageService.clearData();
  }
  

}
