import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  modelName: String;
  public loginToaster = new Subject<boolean>();
  


  constructor(private http: HttpClient) { 
    this.modelName = 'user/Login'
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
