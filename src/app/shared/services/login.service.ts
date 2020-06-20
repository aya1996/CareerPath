import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface User{
  id: string;
  userName: string;
  fname: string,
  lname: string
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  modelName: String;
  public loginToaster = new Subject<boolean>();
  


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

  
  public showToaster() {
    this.loginToaster.next(true);
    setInterval(() => {
      this.hideToaster();
    }, 5000);
  }
  //hide modal product Added to cart .. ... ... ... ... ...
  public hideToaster() {
    this.loginToaster.next(false);
  }

}
