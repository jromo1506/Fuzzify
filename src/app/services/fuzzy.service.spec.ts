import { TestBed } from '@angular/core/testing';

import { FuzzyService } from './fuzzy.service';

describe('FuzzyService', () => {
   let service: FuzzyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuzzyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('mapToThreeLevels', () => {
    it('should return 1 when value is in the first third', () => {
      expect(service.mapToThreeLevels(0, 0, 90)).toBe(1);
    });

    it('should return 2 when value is in the second third', () => {
      expect(service.mapToThreeLevels(40, 0, 90)).toBe(2);
    });

    it('should return 3 when value is in the last third', () => {
      expect(service.mapToThreeLevels(80, 0, 90)).toBe(3);
    });
  });

  describe('getLabel', () => {
    it('should return correct Spanish temperature label', () => {
      const result = service.getLabel(1, 'temp', 'es');
      expect(result).toEqual({ level: 1, label: 'Fría' });
    });

    it('should return correct English humidity label', () => {
      const result = service.getLabel(2, 'hum', 'en');
      expect(result).toEqual({ level: 2, label: 'Medium' });
    });

    it('should return correct Spanish wind label', () => {
      const result = service.getLabel(3, 'wind', 'es');
      expect(result).toEqual({ level: 3, label: 'Fuerte' });
    });
  });

  describe('getFuzzyLabel', () => {
    it('should return correct label based on mapped level', () => {
      spyOn(service, 'mapToThreeLevels').and.returnValue(2);
      spyOn(service, 'getLabel').and.returnValue({ level: 2, label: 'TestLabel' });

      const result = service.getFuzzyLabel(50, 'temp', 'es', 0, 100);

      expect(service.mapToThreeLevels).toHaveBeenCalledWith(50, 0, 100);
      expect(service.getLabel).toHaveBeenCalledWith(2, 'temp', 'es');
      expect(result).toEqual({ level: 2, label: 'TestLabel' });
    });
  });

  describe('nivelComodidad', () => {
    it('should return 100 for perfect ideal values', () => {
      const result = service.nivelComodidad(22, 50, 10);
      expect(result).toBe(100);
    });

    it('should return a value less than 100 for non-ideal values', () => {
      const result = service.nivelComodidad(0, 0, 0);
      expect(result).toBeLessThan(100);
    });

    it('should round to 1 decimal place', () => {
      const result = service.nivelComodidad(23, 51, 11);
      expect(result).toEqual(jasmine.any(Number));
      const decimals = result.toString().split('.')[1]?.length || 0;
      expect(decimals).toBeLessThanOrEqual(1);
    });
  });
});
