import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user, userData } from '../Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:4000/api/user/getProfile"
  apiUrl2 = "http://localhost:4000/api/user"
  constructor(private _http:HttpClient) { }

  getUserProfile(){
    return this._http.get<user>(this.apiUrl);
  }
  updateUser(id, data:user){
    return this._http.put(`${this.apiUrl}/${id}`,data);
  }
  getUserById(id){
    return this._http.get<user>(`${this.apiUrl}/${id}`);
  }
  getAllUsers(){
    return this._http.get<userData[]>(`${this.apiUrl2}/GetAllUsers`)
  }
}
