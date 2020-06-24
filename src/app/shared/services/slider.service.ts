import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  postSlider(data:slider){
    return this._http.post(this.apiUrl,data);
  }

  updateSlider(id, data:slider){
    return this._http.put(`${this.apiUrl}/${id}`,data);
  }

  deleteSlider(id){
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
