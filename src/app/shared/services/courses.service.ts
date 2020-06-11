import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  modelName = 'course';
  url='http://localhost:4200/api';
//please wait
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
  getCourseById(id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.url}/${this.modelName}/${id}`)
      .pipe(catchError(this.handleError));
  }
  addCourse(model: any): Observable<void> {
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
}
