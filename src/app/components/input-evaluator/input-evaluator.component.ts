import { Component } from '@angular/core';
import { SensorDataService } from '../../services/sensor-data.service';
import { CommonModule } from '@angular/common';
import { NgxGaugeModule } from 'ngx-gauge';
import { FuzzyService } from '../../services/fuzzy.service';

@Component({
  selector: 'app-input-evaluator',
  imports: [CommonModule,NgxGaugeModule],
  templateUrl: './input-evaluator.component.html',
  styleUrl: './input-evaluator.component.scss'
})
export class InputEvaluatorComponent {
  temp:number=0;
  humidity:number=0;
  wind:number=0;

  comfortValue = 50; 

  constructor(private sensorDataService:SensorDataService,private fuzzService:FuzzyService){}

  
    ngOnInit() {
      this.sensorDataService.temp$.subscribe((t:any) => {
        this.temp = t;
        this.evaluateComfort();
      });

      this.sensorDataService.humidity$.subscribe((h:any) => {
        this.humidity = h;
        this.evaluateComfort();
      });

      this.sensorDataService.wind$.subscribe((w:any) => {
        this.wind = w;
        this.evaluateComfort();
      });
    }

    evaluateComfort() {
      const tempLevel = this.fuzzService.mapToThreeLevels(this.temp, -20, 50);  // 1=frío, 2=templado, 3=caliente
      const humLevel = this.fuzzService.mapToThreeLevels(this.humidity, 0, 100);        // 1=baja, 2=media, 3=alta
      const windLevel = this.fuzzService.mapToThreeLevels(this.wind, 0, 100); 

      if (this.temp == null || this.humidity == null || this.wind == null) return;
      // lógica difusa con this.temp, this.humidity, this.wind
    }
}
