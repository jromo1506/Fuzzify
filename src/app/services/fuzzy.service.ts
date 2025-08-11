import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuzzyService {
  
  labels = {
    es: {
      1: ['Fría', 'Baja', 'Nulo'],
      2: ['Templada', 'Media', 'Moderado'],
      3: ['Caliente', 'Alta', 'Fuerte'],
    },
    en: {
      1: ['Cold', 'Low', 'None'],
      2: ['Warm', 'Medium', 'Light'],
      3: ['Hot', 'High', 'Strong'],
    }
  };
  constructor() { }




  getFuzzyLabel(value: number,scale: 'temp' | 'hum' | 'wind', lang: 'es' | 'en', min: number,max: number): any{

    const level = this.mapToThreeLevels(value, min, max);
    return this.getLabel(level, scale, lang);
  }
  
  // Divide las escalas en tercios para poder fuzzificar en base a que tercio
   mapToThreeLevels(value: number, min: number, max: number): 1 | 2 | 3 {
      const range = max - min;
      if (value < min + range / 3) return 1;        
      if (value < min + 2 * range / 3) return 2;    
      return 3;                                    
    }


  //Regresa la palabra dependiendo del tercio, de la medida  y el lenguaje
  getLabel(num: 1 | 2 | 3, scale: 'temp' | 'hum' | 'wind', lang: 'es' | 'en'): { level: number, label: string } {
    const scaleIndex = { temp: 0, hum: 1, wind: 2 }[scale];
    return {
      level: num,
      label: this.labels[lang][num][scaleIndex]
    };

  }


  nivelComodidad(temp: number, hum: number, viento: number): number {
  const minTemp = -20, maxTemp = 50;
  const minHum = 0, maxHum = 100;
  const minViento = 0, maxViento = 30;

  const idealTemp = 22;
  const idealHum = 50;
  const idealViento = 10;

  const normTemp = Math.min(Math.abs(temp - idealTemp) / (maxTemp - minTemp), 1);
  const normHum = Math.min(Math.abs(hum - idealHum) / (maxHum - minHum), 1);
  const normViento = Math.min(Math.abs(viento - idealViento) / (maxViento - minViento), 1);

  const avgDiff = (normTemp + normHum + normViento) / 3;
  const comodidad = (1 - avgDiff) * 100;

  return Math.round(comodidad * 10) / 10; // 1 decimal
}

    



}
