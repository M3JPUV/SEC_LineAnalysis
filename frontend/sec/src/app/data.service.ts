import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTemps() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId)
  }

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  getTest() {
    return this.http.get('http://138.47.204.105:5000/api/tests')
  }
}
