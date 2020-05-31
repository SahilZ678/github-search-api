import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarkdownModule } from 'ngx-markdown';


import { GithubApiService } from './services/github-api/github-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositorySearchComponent } from './components/repository-search/repository-search.component';
import { SearchListComponent } from './components/repository-search/search-list/search-list.component';
import { RepositoryDetailsComponent } from './components/repository-details/repository-details.component';


@NgModule({
  declarations: [
    AppComponent,
    RepositorySearchComponent,
    SearchListComponent,
    RepositoryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  providers: [
    GithubApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
