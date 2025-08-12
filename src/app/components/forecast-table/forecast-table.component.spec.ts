import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { CustomMatPaginatorIntl, ForecastTableComponent } from './forecast-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LocalStorageService } from '../../services/local-storage.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ForecastTableComponent', () => {
  let component: ForecastTableComponent;
  let fixture: ComponentFixture<ForecastTableComponent>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LocalStorageService', ['data$'], { data$: of([]) });

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule, MatSortModule],
      declarations: [ForecastTableComponent],
      providers: [
        { provide: LocalStorageService, useValue: spy },
        { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
      ]
    }).compileComponents();

    localStorageServiceSpy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to localStorageService data$ and update dataSource data', fakeAsync(() => {
    const testData = [
      { temp: 20, humidity: 30, wind: 10 },
      { temp: 25, humidity: 40, wind: 15 }
    ];

    // Replace the observable with new test data
    localStorageServiceSpy.data$ = of(testData);
    
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(testData);
  }));

  it('should set paginator and sort after view init', () => {
    fixture.detectChanges(); // triggers ngAfterViewInit

    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('should display table headers', () => {
    fixture.detectChanges();
    const headers = fixture.debugElement.queryAll(By.css('th.mat-header-cell'));
    const headerTexts = headers.map(h => h.nativeElement.textContent.trim());
    expect(headerTexts).toEqual(['Temp', 'Humidity', 'Wind']);
  });
});
