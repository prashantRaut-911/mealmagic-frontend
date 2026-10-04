import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   private backendUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.backendUrl}/getAllUsers`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.backendUrl}/getUser/${id}`);
  }

  updateUser(id: string, updatedData: any): Observable<User> {
    return this.http.put<User>(`${this.backendUrl}/updateUser/${id}`, updatedData);
  }
}
