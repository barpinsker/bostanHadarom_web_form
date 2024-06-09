import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
baseUrl='http://127.0.0.1:8200/api'
constructor(private http: HttpClient) { }

// createForm(form:Object):Observable<any>{
//   return this.http.post(`${this.baseUrl}/event-forms/`,form);
// }
}
