import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  private tempSubject = new BehaviorSubject<number>(0);
  private humiditySubject = new BehaviorSubject<number>(0);
  private windSubject = new BehaviorSubject<number>(0);


  temp$ = this.tempSubject.asObservable();
  humidity$ = this.humiditySubject.asObservable();
  wind$ = this.windSubject.asObservable();


  constructor() { }


   setTemperature(value: number) {
    this.tempSubject.next(value);
  }

  setHumidity(value: number) {
    this.humiditySubject.next(value);
  }

  setWind(value: number) {
    this.windSubject.next(value);
  }
}
