import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuzzifierComponent } from './pages/fuzzifier/fuzzifier.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FuzzifierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Actividad';
}
