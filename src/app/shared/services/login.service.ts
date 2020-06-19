import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

interface User{
  id: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  modelName: String;
  constructor(private http: HttpClient) { 
    this.modelName = 'user/Login'
  }

  getAllUsers(){
    return this.http.get<User[]>("http://localhost:4000/api/user/GetAllUsers");
  }

  public login(model: any): Observable<void> {
    return this.http
      .post<void>(`${environment.url}/${this.modelName}`, model);
    // .pipe(catchError(this.handleError));
  }

}
