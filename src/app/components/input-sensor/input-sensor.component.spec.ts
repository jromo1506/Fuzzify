import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSensorComponent } from './input-sensor.component';

describe('InputSensorComponent', () => {
  let component: InputSensorComponent;
  let fixture: ComponentFixture<InputSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSensorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
