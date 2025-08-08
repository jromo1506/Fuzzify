import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEvaluatorComponent } from './input-evaluator.component';

describe('InputEvaluatorComponent', () => {
  let component: InputEvaluatorComponent;
  let fixture: ComponentFixture<InputEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputEvaluatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
