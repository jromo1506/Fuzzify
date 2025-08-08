import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfortDisplayComponent } from './comfort-display.component';

describe('ComfortDisplayComponent', () => {
  let component: ComfortDisplayComponent;
  let fixture: ComponentFixture<ComfortDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComfortDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComfortDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
