import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { InputEvaluatorComponent } from './input-evaluator.component';
import { Subject } from 'rxjs';
import { SensorDataService } from '../../services/sensor-data.service';
import { FuzzyService } from '../../services/fuzzy.service';

describe('InputEvaluatorComponent', () => {
  let component: InputEvaluatorComponent;
  let fixture: ComponentFixture<InputEvaluatorComponent>;

  let sensorDataServiceMock: any;
  let fuzzyServiceMock: any;

  let tempSubject: Subject<number>;
  let humiditySubject: Subject<number>;
  let windSubject: Subject<number>;

  beforeEach(async () => {
    tempSubject = new Subject<number>();
    humiditySubject = new Subject<number>();
    windSubject = new Subject<number>();

    sensorDataServiceMock = {
      temp$: tempSubject.asObservable(),
      humidity$: humiditySubject.asObservable(),
      wind$: windSubject.asObservable(),
    };

    fuzzyServiceMock = {
      getFuzzyLabel: jasmine.createSpy('getFuzzyLabel').and.callFake((value: number, type: string) => {
        return { label: `${type}-label` };
      }),
      nivelComodidad: jasmine.createSpy('nivelComodidad').and.returnValue(75),
    };

    await TestBed.configureTestingModule({
      imports: [InputEvaluatorComponent],
      providers: [
        { provide: SensorDataService, useValue: sensorDataServiceMock },
        { provide: FuzzyService, useValue: fuzzyServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputEvaluatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to sensor data on init and call evaluateComfort', fakeAsync(() => {
    spyOn(component, 'evaluateComfort').and.callThrough();
    component.ngOnInit();

    tempSubject.next(20);
    humiditySubject.next(50);
    windSubject.next(10);

    tick();

    expect(component.temp).toBe(20);
    expect(component.humidity).toBe(50);
    expect(component.wind).toBe(10);
    expect(component.evaluateComfort).toHaveBeenCalledTimes(3);
  }));

  it('evaluateComfort should skip if any sensor value is null', () => {
    component.temp = null as any;
    component.humidity = 50;
    component.wind = 10;
    component.evaluateComfort();
    expect(component.showComfy).toBe(false);

    component.temp = 20;
    component.humidity = null as any;
    component.wind = 10;
    component.evaluateComfort();
    expect(component.showComfy).toBe(false);

    component.temp = 20;
    component.humidity = 50;
    component.wind = null as any;
    component.evaluateComfort();
    expect(component.showComfy).toBe(false);
  });

  it('evaluateComfort should call fuzzService methods and set flags properly', fakeAsync(() => {
    component.temp = 20;
    component.humidity = 50;
    component.wind = 10;

    component.evaluateComfort();

    tick(1000);

    expect(fuzzyServiceMock.getFuzzyLabel).toHaveBeenCalledWith(20, 'temp', 'es', -20, 50);
    expect(fuzzyServiceMock.getFuzzyLabel).toHaveBeenCalledWith(50, 'hum', 'es', 0, 100);
    expect(fuzzyServiceMock.getFuzzyLabel).toHaveBeenCalledWith(10, 'wind', 'es', 0, 30);

    expect(fuzzyServiceMock.nivelComodidad).toHaveBeenCalledWith(20, 50, 10);
    expect(component.comfyLevel).toBe(75);
    expect(component.showComfy).toBeTrue();
  }));

  it('animateAppearance should set showTemp, showHum and showWind flags with delays', fakeAsync(() => {
    let promiseResolved = false;
    component.animateAppearance().then(() => (promiseResolved = true));

    expect(component.showTemp).toBeFalse();
    expect(component.showHum).toBeFalse();
    expect(component.showWind).toBeFalse();

    tick(0);
    expect(component.showTemp).toBeTrue();
    expect(component.showHum).toBeFalse();
    expect(component.showWind).toBeFalse();

    tick(500);
    expect(component.showHum).toBeTrue();
    expect(component.showWind).toBeFalse();

    tick(500);
    expect(component.showWind).toBeTrue();
    expect(promiseResolved).toBeTrue();
  }));
});
