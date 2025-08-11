import { Component } from '@angular/core';
import { SensorDataService } from '../../services/sensor-data.service';
import { CommonModule } from '@angular/common';
import { NgxGaugeModule } from 'ngx-gauge';
import { FuzzyService } from '../../services/fuzzy.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ComfortDisplayComponent } from '../comfort-display/comfort-display.component';
@Component({
  selector: 'app-input-evaluator',
  imports: [CommonModule,NgxGaugeModule,ComfortDisplayComponent],
  templateUrl: './input-evaluator.component.html',
  styleUrl: './input-evaluator.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class InputEvaluatorComponent {
  temp:number=0;
  humidity:number=0;
  wind:number=0;

  comfortValue = 50; 

  tempLevel: any = {};
  humLevel:any = {};
  windLevel:any={};

  showTemp = false;
  showHum = false;
  showWind = false;


  comfyLevel = 0;
  showComfy= false;


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
      this.showComfy=false;
      if (this.temp == null || this.humidity == null || this.wind == null) return;

      this.showComfy = false;
      this.tempLevel = this.fuzzService.getFuzzyLabel(this.temp, "temp", "es", -20, 50);
      this.humLevel = this.fuzzService.getFuzzyLabel(this.humidity, "hum", "es", 0, 100);
      this.windLevel = this.fuzzService.getFuzzyLabel(this.wind, "wind", "es", 0, 30);

      this.animateAppearance().then(() => {
      setTimeout(() => {
          this.comfyLevel = this.fuzzService.nivelComodidad(this.temp, this.humidity, this.wind);
          this.showComfy = true;
          console.log(this.comfyLevel, "e");
        }, 100);
      });
}

animateAppearance(): Promise<void> {
  this.showTemp = false;
  this.showHum = false;
  this.showWind = false;

  return new Promise((resolve) => {
    setTimeout(() => {
      this.showTemp = true;
    }, 0);

    setTimeout(() => {
      this.showHum = true;
    }, 500);

    setTimeout(() => {
      this.showWind = true;
      resolve();
    }, 1000);
  });
}
}
