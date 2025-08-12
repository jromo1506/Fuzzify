import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
   private storageKey = 'weatherData';
  private dataSubject = new BehaviorSubject<any[]>(this.getData());

  data$ = this.dataSubject.asObservable();

  saveData(data: any) {
    const arr = this.getData();
    arr.push(data);
    localStorage.setItem(this.storageKey, JSON.stringify(arr));
    this.dataSubject.next(arr);
  }

  getData(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  clearData() {
    localStorage.removeItem(this.storageKey);
    this.dataSubject.next([]); 
  }
}
