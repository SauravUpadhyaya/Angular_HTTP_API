import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpParams} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(public http: HttpClient) { }
  

  getUsers():Observable<User[]>{
    //let myParams = new HttpParams().set('page', '5').set('sort', 'true');
    //return this.http.get<User[]>('${environment.apiUrl}/users');
    //return this.http.get<User[]>(`${this.apiUrl}/users`, {params: myParams});
    return this.http.get<User[]>(`${this.apiUrl}/users`)
    // .pipe(  
    //   catchError((error:any)=>{   // Error Catch and Replace
    //     return of([]); // returning an Empty obserable 
    //     this.handleError(error);
    //   }));
    //# implementing catch and rethrow
    .pipe(
      catchError(this.handleError));
    

  

    //return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
   private handleError(error: HttpErrorResponse):Observable<never>{
    if(error.status=== 404) {
     return  throwError({code:404, message:'page not found or file not found'});
    }
    else{
      return throwError(error);
    }
    
  }
  
  getUser():Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/1`);
    //return this.http.get<User>('https://jsonplaceholder.typicode.com/users/1');
  }

  createUser(user: User):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/users`,user);

  }

  updateUser(user: User):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`,user);

  }


  updatePatchUser(user: User):Observable<User>{
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`,user);

  }


  deleteUser(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);

  }


  uploadFiles(formData:FormData): Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(`http://localhost:9000/file/upload`, formData, {observe:'events', reportProgress:true});

  }
}
