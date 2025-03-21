import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user,userData } from '../Models/user.model';
import { editUser } from '../Models/editUser';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:4000/api/user/getProfile";
  apiUrl2 = "http://localhost:4000/api/user";
  apiEditLevel = "http://localhost:4000/api/user/editUserLevel";
  apiEditState = "http://localhost:4000/api/user/EditUserStatus";
 
  Url = "http://localhost:4000/api/user/GetUserByID"
  edit = "http://localhost:4000/api/user/EditProfile"

  constructor(private _http:HttpClient) { }

  getUserProfile(){
    return this._http.get<user>(this.apiUrl);
  }
  updateUser(id,data:editUser){
    return this._http.put(`${this.edit}`,data);
  }
  getUserById(id){
    return this._http.get<editUser>(`${this.Url}/${id}`);
  }
  getAllUsers(){
    return this._http.get<userData[]>(`${this.apiUrl2}/GetAllUsers`)
  }
  editUserLevel(data){
    return this._http.put(this.apiEditLevel,data);
  }
  editUserState(data){
    return this._http.put(this.apiEditState,data);
  }

}
  // postMethod(files: FileList) {
  // this.fileToUpload = files.item(0); 
  // let formData = new FormData(); 
  // formData.append('file', this.fileToUpload, this.fileToUpload.name); 
  // this._http.post(`${this.edit}`, formData).subscribe((val) => {
  
  // console.log(val);
  // });
  // return false; 
  // }