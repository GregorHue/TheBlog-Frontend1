import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, CategoryDtoList } from '../interfaces/category';
import { BASEURL } from '../utils/baseUrl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;

  }

  getCategories(): Observable<Category[]> {

    return this.http.get<CategoryDtoList>(`${BASEURL}/categories`).pipe(map(list => list.categories));

  }
}
