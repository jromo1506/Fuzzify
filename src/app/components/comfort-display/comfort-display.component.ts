import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';

@Component({
  selector: 'app-comfort-display',
  imports: [CommonModule,NgxGaugeModule],
  templateUrl: './comfort-display.component.html',
  styleUrl: './comfort-display.component.scss'
})
export class ComfortDisplayComponent {

  comfortValue = 50; 
}
