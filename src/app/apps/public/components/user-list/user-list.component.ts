import { Component } from '@angular/core';
import { TablePagesComponent } from '../../../../components/table-pages/table-pages.component';
import { TableFirstLastComponent } from '../../../../components/table-first-last/table-first-last.component';
import { UserListService } from './user-list.service';
import { UserType } from './user-list.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: true,
  imports: [
    //Components
    TablePagesComponent,
    TableFirstLastComponent,
  ],
  host: {
    class: 'app-host',
  },
})
export class UserListComponent {
  //Attributes
  activePage: number = 1;
  parentPageList: number[] = new Array(9);
  firstPage: boolean = true;
  lastPage: boolean = false;

  usersList: UserType[] = [];

  constructor(private userListService: UserListService) {
    this.userListService.getUserFromServer().then((users) => {
      this.usersList = users;
    });
  }

  //Methods
  pageChanged(pageNo: number) {
    if (pageNo != 1 && 9) {
      this.activePage = pageNo;
      this.firstPage = false;
      this.lastPage = false;
    }

    if (pageNo == 1) {
      this.firstPageChanged(true);
    }

    if (pageNo == 9) {
      this.lastPageChanged(true);
    }
  }

  firstPageChanged(status: boolean) {
    this.firstPage = status;

    if (status) {
      this.lastPage = false;
      this.activePage = 1;
    }
  }

  lastPageChanged(status: boolean) {
    this.lastPage = status;

    if (status) {
      this.activePage = 9;
      this.firstPage = false;
    }
  }
}
