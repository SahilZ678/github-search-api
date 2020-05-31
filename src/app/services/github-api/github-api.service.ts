import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SEARCH_ITEMS_PER_PAGE = 1000;


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private _http: HttpClient) { }

  public searchRepositoriesByName(name: string): Observable<Object> {
    const url = this._generateSearchInRepositoriesUrl(name);

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

  private _generateSearchInRepositoriesUrl(name: string): string {
    return `https://api.github.com/search/repositories?q=${name}&per_page=${SEARCH_ITEMS_PER_PAGE}`;
  }

  private _generateRepositoryUrl(owner: string, repo: string) {
    return `https://api.github.com/repos/${owner}/${repo}`;
  }

  private _generateRepoReadme(owner: string, repo: string) {
    return `https://api.github.com/repos/${owner}/${repo}/readme`;
  }
}
