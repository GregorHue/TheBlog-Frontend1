import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryDtoList } from '../interfaces/category';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http: HttpClient;

  cache: Observable<Category[]>;

  constructor(http: HttpClient) {
    this.http = http;

  }

  getCategories(): Observable<Category[]> {

    if (!this.cache) {
      this.cache = this.http.get<CategoryDtoList>(`${BASEURL}/categories`).pipe(map(list => list.categories), publishReplay(1), refCount());
    }
    return this.cache;
  }
}
