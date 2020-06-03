import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

import { Repository } from '../../../models/repository';
import { PaginationInstance } from 'ngx-pagination';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent implements OnInit {

  @Input() repositoryList: Repository[];
  page: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
};

}
