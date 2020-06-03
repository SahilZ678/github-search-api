import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {Location} from '@angular/common';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';


import { GithubApiService } from '../../services/github-api/github-api.service';


@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnInit {

  public subHeading = 'Repository Details of ';
  public repository = null;
  public repoReadme = null;
  public error: string;

  public isLoading: boolean;
  private _subscription: any;
  private _owner: string;
  private _repo: string;

  constructor(
    private _githubApiService: GithubApiService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this._subscription = this._route.params.subscribe(params => {
      this._owner = params.owner;
      this._repo = params.repo;
      this.subHeading += `${this._owner}/${this._repo}`;

      this._init();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _init(): void {
    this.isLoading = true;
    this._githubApiService.getRepositoryByOwnerAndRepo(this._owner, this._repo).subscribe(
        (repoData: any) => {
          this._githubApiService.getRepositoryReadme(this._owner, this._repo).subscribe(
            (readmeData: any) => {
              this.repository = repoData;
              this.repoReadme = atob(readmeData.content);
              this.isLoading = false;
            }
          )
        },
        (err: HttpErrorResponse) => {
          this.repository = '';
          this.error = err.statusText;
        }
      );
  }

  backClicked() {
    this._location.back();
  }

}
