import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GitHubService {
  baseApiUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  GetSearchResults(search_string:string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + `search/users?q=${search_string}`);
  }
  GetSearchDetails(login:string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + `users/${login}`);
  }
}
