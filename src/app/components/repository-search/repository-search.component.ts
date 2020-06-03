import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { GithubApiService } from '../../services/github-api/github-api.service';

import { RepositorySearchResult, Repository } from '../../models/repository';


@Component({
  selector: 'app-repository-search',
  templateUrl: './repository-search.component.html',
  styleUrls: ['./repository-search.component.scss']
})
export class RepositorySearchComponent implements OnInit {

  public subHeading = 'You can use this search form for searching among GitHub repositories.';
  public searchControl: FormControl = new FormControl();
  public repositoryList: Repository[] = [];
  public searchName = '';
  public error: string;
  public isLoading: boolean = false;

  public sortValue: string;
  public sortingValues = ['best-match', 'stars', 'forks', 'help-wanted-issues'];

  constructor(
    private _githubApiService: GithubApiService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.searchName = window.localStorage.getItem('searchData');
    if (this.searchName && this.searchName.length > 0) {
      this._search();
    }
    this.sortValue = 'best-match';
  }

  onSubmit(): void {
    if (!this.searchControl.value || this.searchControl.value.trim() === '') {
      return;
    }
    this.searchName = this.searchControl.value;
    window.localStorage.setItem('searchData', this.searchName);
    this._search();
  }

  formatOptions(string: string): string {
    let value = string.charAt(0).toUpperCase() + string.slice(1);
    return value.split('-').join(' ');
  }
  

  private _search(): void {
    this.isLoading = true;
    this._githubApiService.searchRepositoriesByName(this.searchName, this.sortValue)
      .subscribe(
        (data: RepositorySearchResult) => {
          const { total_count: totalCount, items } = data;
          if (totalCount > 0) {
            this.repositoryList = items;
          } else {
            this.repositoryList = [];
            this.error = 'Not found. Please try again or use a different name is the search input above.';
          }
          this.isLoading = false;
        },
        (err: HttpErrorResponse) => {
          this.error = err.statusText;
          this.isLoading = false;
        }
      );
  }
}
