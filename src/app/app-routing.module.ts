import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositorySearchComponent } from './components/repository-search/repository-search.component';
import { RepositoryDetailsComponent } from './components/repository-details/repository-details.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/repository/search',
    pathMatch: 'full',
  },
  {
    path: 'repository/search',
    component: RepositorySearchComponent,
  },
  {
    path: 'repository/details/:owner/:repo',
    component: RepositoryDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
