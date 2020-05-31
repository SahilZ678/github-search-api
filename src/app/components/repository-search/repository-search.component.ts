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

  private _subscription: any;

  constructor(
    private _githubApiService: GithubApiService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._subscription = this._route.params.subscribe(params => {
      this.searchName = params.searchName || '';

      if (this.searchName && this.searchName.length > 0) {
        this._search();
      }
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onSubmit(): void {
    if (!this.searchControl.value || this.searchControl.value.trim() === '') {
      return;
    }

    this.searchName = this.searchControl.value;
    this._search();
  }

  private _search(): void {
    this._githubApiService.searchRepositoriesByName(this.searchName)
      .subscribe(
        (data: RepositorySearchResult) => {
          const { total_count: totalCount, items } = data;
          if (totalCount > 0) {
            this.repositoryList = items;
          } else {
            this.repositoryList = [];
            this.error = 'Not found. Please try again or use a different name is the search input above.';
          }
        },
        (err: HttpErrorResponse) => {
          this.error = err.statusText;
        }
      );
  }
}
