import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-comfort-display',
  imports: [CommonModule,NgxGaugeModule],
  templateUrl: './comfort-display.component.html',
  styleUrl: './comfort-display.component.scss',
  animations:[trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
})
export class ComfortDisplayComponent {
  @Input() comfortValue:number = 0;
   
}
