import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuzzifierComponent } from './fuzzifier.component';

describe('FuzzifierComponent', () => {
  let component: FuzzifierComponent;
  let fixture: ComponentFixture<FuzzifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuzzifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuzzifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
