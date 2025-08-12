import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSensorComponent } from './input-sensor.component';
import { SensorDataService } from '../../services/sensor-data.service';

describe('InputSensorComponent', () => {
  let component: InputSensorComponent;
  let fixture: ComponentFixture<InputSensorComponent>;
  let sensorDataServiceMock: any;

  beforeEach(async () => {
    sensorDataServiceMock = {
      setTemperature: jasmine.createSpy('setTemperature'),
      setHumidity: jasmine.createSpy('setHumidity'),
      setWind: jasmine.createSpy('setWind'),
    };

    await TestBed.configureTestingModule({
      imports: [InputSensorComponent],  // <--- Cambiado declarations por imports
      providers: [
        { provide: SensorDataService, useValue: sensorDataServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSensorComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onTemperaturaChange should update temperatura and call setTemperature', () => {
    const mockEvent = { target: { value: '25' } } as unknown as Event;
    component.onTemperaturaChange(mockEvent);
    expect(component.temperatura).toBe(25);
    expect(sensorDataServiceMock.setTemperature).toHaveBeenCalledWith(25);
  });

  it('onHumedadChange should update humedad and call setHumidity', () => {
    const mockEvent = { target: { value: '60' } } as unknown as Event;
    component.onHumedadChange(mockEvent);
    expect(component.humedad).toBe(60);
    expect(sensorDataServiceMock.setHumidity).toHaveBeenCalledWith(60);
  });

  it('onVientoChange should update viento and call setWind', () => {
    const mockEvent = { target: { value: '15' } } as unknown as Event;
    component.onVientoChange(mockEvent);
    expect(component.viento).toBe(15);
    expect(sensorDataServiceMock.setWind).toHaveBeenCalledWith(15);
  });

  it('tempCounter should update temperatura without calling service', () => {
    const mockEvent = { target: { value: '30' } } as unknown as Event;
    component.tempCounter(mockEvent);
    expect(component.temperatura).toBe(30);
    expect(sensorDataServiceMock.setTemperature).not.toHaveBeenCalled();
  });

  it('humCounter should update humedad without calling service', () => {
    const mockEvent = { target: { value: '70' } } as unknown as Event;
    component.humCounter(mockEvent);
    expect(component.humedad).toBe(70);
    expect(sensorDataServiceMock.setHumidity).not.toHaveBeenCalled();
  });

  it('windCounter should update viento without calling service', () => {
    const mockEvent = { target: { value: '20' } } as unknown as Event;
    component.windCounter(mockEvent);
    expect(component.viento).toBe(20);
    expect(sensorDataServiceMock.setWind).not.toHaveBeenCalled();
  });
});
