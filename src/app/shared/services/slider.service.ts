import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError ,Subject } from 'rxjs';
import { slider } from '../Models/slider.model';

@Injectable({
  providedIn: 'root'
})
export class sliderService {
  
  constructor(private _http:HttpClient) { }

  apiUrl = "http://localhost:4000/api/Slider";

  getSlider(){
    return this._http.get<slider[]>(this.apiUrl);
  }

  getSliderById(id){
    return this._http.get<slider>(`${this.apiUrl}/${id}`)
  }

  postSlider(model: any): Observable<void>{
    return this._http.post<void>(`${this.apiUrl}`,model);
  }

  updateSlider(id, data:slider){
    return this._http.put(`${this.apiUrl}/${id}`,data);
  }

  deleteSlider(id){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
