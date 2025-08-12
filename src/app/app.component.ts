import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuzzifierComponent } from './pages/fuzzifier/fuzzifier.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FuzzifierComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
