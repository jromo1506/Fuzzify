import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { SensorDataService } from './sensor-data.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ComfortDisplayComponent } from '../components/comfort-display/comfort-display.component';

describe('SensorDataService', () => {
   let service: SensorDataService;

  beforeEach(() => {
     TestBed.configureTestingModule({
     
      imports: [ComfortDisplayComponent],
      providers: [provideAnimations()],
    }).compileComponents();
    service = TestBed.inject(SensorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit new temperature values', (done) => {
    service.temp$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(0);
      done();
    });
    service.setTemperature(0);
  });

  it('should emit new humidity values', (done) => {
    service.humidity$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(0);
      done();
    });
    service.setHumidity(0);
  });

  it('should emit new wind values', (done) => {
    service.wind$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(0);
      done();
    });
    service.setWind(0);
  });

  it('should have initial default values as 0', (done) => {
    let tempVal: number;
    let humVal: number;
    let windVal: number;

    service.temp$.pipe(take(1)).subscribe((v) => {
      tempVal = v;
      service.humidity$.pipe(take(1)).subscribe((h) => {
        humVal = h;
        service.wind$.pipe(take(1)).subscribe((w) => {
          windVal = w;

          expect(tempVal).toBe(0);
          expect(humVal).toBe(0);
          expect(windVal).toBe(0);
          done();
        });
      });
    });
  });
});
