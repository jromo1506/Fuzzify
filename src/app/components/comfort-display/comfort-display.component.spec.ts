import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComfortDisplayComponent } from './comfort-display.component';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ComfortDisplayComponent', () => {
  let component: ComfortDisplayComponent;
  let fixture: ComponentFixture<ComfortDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComfortDisplayComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ComfortDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el valor de comfort', () => {
    component.comfortValue = 75;
    fixture.detectChanges();

    const gauge = fixture.debugElement.query(By.css('ngx-gauge'));
    expect(gauge).toBeTruthy();
    expect(component.comfortValue).toBe(75);
  });
});