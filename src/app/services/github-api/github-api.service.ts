import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private _http: HttpClient) { }

  public searchRepositoriesByName(name: string, sort: string): Observable<Object> {
    const url = this._generateSearchInRepositoriesUrl(name, sort);

    return this._http.get(url);
  }

  public getRepositoryByOwnerAndRepo(owner: string, repo: string): Observable<Object> {
    const url: string = this._generateRepositoryUrl(owner, repo);

    return this._http.get(url);
  }
  
  public getRepositoryReadme(owner: string, repo: string): Observable<Object> {
    const url: string = this._generateRepoReadme(owner, repo);

    return this._http.get(url);
  }

  private _generateSearchInRepositoriesUrl(name: string, sort: string): string {
    return `https://api.github.com/search/repositories?q=${name}&sort=${sort}&per_page=1000`;
  }

  private _generateRepositoryUrl(owner: string, repo: string) {
    return `https://api.github.com/repos/${owner}/${repo}`;
  }

  private _generateRepoReadme(owner: string, repo: string) {
    return `https://api.github.com/repos/${owner}/${repo}/readme`;
  }
}
