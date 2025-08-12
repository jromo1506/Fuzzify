// forecast-table.component.ts
import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

// Internacionalización básica para paginador
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página:';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
}

@Component({
  selector: 'app-forecast-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatPaginatorModule, MatSortModule],
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }]
})
export class ForecastTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['temp', 'humidity', 'wind'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.localStorageService.data$.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
