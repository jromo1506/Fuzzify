import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { SensorDataService } from './sensor-data.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ComfortDisplayComponent } from '../components/comfort-display/comfort-display.component';
import { LocalStorageService } from './local-storage.service';

describe('SensorDataService', () => {
   let service: LocalStorageService;
  const storageKey = 'weatherData';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty data if localStorage is empty', (done) => {
    service.data$.pipe(take(1)).subscribe((data:any) => {
      expect(data).toEqual([]);
      done();
    });
  });

  it('getData() should return empty array if no data in localStorage', () => {
    expect(service.getData()).toEqual([]);
  });

  it('saveData() should save data to localStorage and emit new data', (done) => {
    const sample = { temp: 25, humidity: 50 };
    service.saveData(sample);

    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0]).toEqual(sample);

    service.data$.pipe(take(1)).subscribe((data:any) => {
      expect(data.length).toBe(1);
      expect(data[0]).toEqual(sample);
      done();
    });
  });

  it('saveData() should append new data without removing existing data', (done) => {
    const first = { temp: 20 };
    const second = { temp: 30 };
    service.saveData(first);
    service.saveData(second);

    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    expect(stored.length).toBe(2);
    expect(stored).toContain(first);
    expect(stored).toContain(second);

    service.data$.pipe(take(1)).subscribe((data:any) => {
      expect(data.length).toBe(2);
      expect(data).toContain(first);
      expect(data).toContain(second);
      done();
    });
  });

  it('clearData() should remove data from localStorage and emit empty array', (done) => {
    service.saveData({ temp: 10 });
    service.clearData();

    expect(localStorage.getItem(storageKey)).toBeNull();

    service.data$.pipe(take(1)).subscribe((data:any) => {
      expect(data).toEqual([]);
      done();
    });
  });
});
