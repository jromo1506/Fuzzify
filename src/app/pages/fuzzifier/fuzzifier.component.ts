import { Component } from '@angular/core';
import { ComfortDisplayComponent } from '../../components/comfort-display/comfort-display.component';
import { InputEvaluatorComponent } from '../../components/input-evaluator/input-evaluator.component';
import { InputSensorComponent } from '../../components/input-sensor/input-sensor.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-fuzzifier',
  imports: [ComfortDisplayComponent,InputEvaluatorComponent,InputSensorComponent,NavbarComponent],
  templateUrl: './fuzzifier.component.html',
  styleUrl: './fuzzifier.component.scss'
})
export class FuzzifierComponent {
  

}
