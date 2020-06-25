import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { password } from '../Models/password.model';
import { editUser } from '../Models/editUser';



@Injectable({
  providedIn: 'root'
})
export class EditUserPassword {

 
  Url = "http://localhost:4000/api/user/GetUserByID"
  edit = "http://localhost:4000/api/user/changePassword"

  constructor(private _http:HttpClient) { }

 
  updateUser(id,data:password){
    return this._http.put(`${this.edit}`,data);
  }
  getUserById(id){
    return this._http.get<editUser>(`${this.Url}/${id}`);
  }
  
 
 

}
 