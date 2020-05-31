import { Component, OnInit, Input } from '@angular/core';

import { Repository } from '../../../models/repository';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() searchSubmitted: boolean;
  @Input() repositoryList: Repository[];

  constructor() { }

  ngOnInit(): void {
  }

}
