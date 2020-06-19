import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError ,Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  modelName = 'user/Register';
  public registerToaster = new Subject<boolean>();
  
  constructor(
    private http: HttpClient,
  ) { }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Clint Side Error', errorResponse.error.message);
    } else {
      console.error('Server Side Error', errorResponse.error);
    }
    return throwError(
      'There is problem with the service we are not notified & working on it.'
    );
  }
  get(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.url}/${this.modelName}`)
      .pipe(catchError(this.handleError));
  }
  getById(id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.url}/${this.modelName}/${id}`)
      .pipe(catchError(this.handleError));
  }
  register(model: any): Observable<void> {
    return this.http
      .post<void>(`${environment.url}/${this.modelName}`, model);
    // .pipe(catchError(this.handleError));
  }

  edit(id: number, model: any): Observable<void> {
    return this.http
      .put<void>(
        `${environment.url}/${this.modelName}/${id}`,
        model
      );
    // .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${environment.url}/${this.modelName}/${id}`)
      .pipe(catchError(this.handleError));
  }
  // isExist(name: string, model: any[]): boolean {
  //   return model.some(a => a.name === name);
  // }
  
  public showToaster() {
    this.registerToaster.next(true);
    setInterval(() => {
      this.hideToaster();
    }, 5000);
  }
  //hide modal product Added to cart .. ... ... ... ... ...
  public hideToaster() {
    this.registerToaster.next(false);
  }
}
