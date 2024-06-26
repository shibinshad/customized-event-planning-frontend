import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  api = environment.api;

  constructor(private http:HttpClient) { }

  getLocation():Observable<any>{
    return this.http.get(`${this.api}/user/locations`)
  }

  getcatering():Observable<any>{
    return this.http.get(`${this.api}/user/catering`)
  }
  getmedia():Observable<any>{
    return this.http.get(`${this.api}/user/media`)
  }
  getdecorations():Observable<any>{
    return this.http.get(`${this.api}/user/decorations`)
  }
  addToCart(data:any):Observable<any>{
    return this.http.post(`${this.api}/user/addToCart`,{data})
  }
}
