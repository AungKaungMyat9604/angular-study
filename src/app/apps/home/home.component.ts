import { Component } from '@angular/core';
import { TablePagesComponent } from '../../components/table-pages/table-pages.component';
import { TableFirstLastComponent } from '../../components/table-first-last/table-first-last.component';
import { HomeService } from './home.service';
import { UserType } from './home.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    //Components
    TablePagesComponent,
    TableFirstLastComponent,
  ],
})
export class HomeComponent {
  //Attributes
  activePage: number = 1;
  parentPageList: number[] = new Array(9);
  firstPage: boolean = true;
  lastPage: boolean = false;

  usersList: UserType[] = [];

  constructor(private homeService: HomeService) {
    this.homeService.getUserFromServer().then((users) => {
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
