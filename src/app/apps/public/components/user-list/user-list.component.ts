import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { debounceTime } from 'rxjs';
import { TableFirstLastComponent } from '../../../../components/table-first-last/table-first-last.component';
import { TablePagesComponent } from '../../../../components/table-pages/table-pages.component';
import { UserListService } from './user-list.service';
import { UserType } from './user-list.type';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: true,
  imports: [
    //Modules
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    //Components
    TableFirstLastComponent,
    TablePagesComponent,
  ],
  host: {
    class: 'app-host',
  },
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) tablePaginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Filter Form Control
  filterFormControl = new FormControl();
  //Attributes
  activePage: number = 1;
  parentPageList: number[] = new Array(9);
  firstPage: boolean = true;
  lastPage: boolean = false;

  //Table
  displayedColumns: string[] = [
    'no',
    'name',
    'age',
    'gender',
    'race',
    'religion',
    'occupation',
    'menu',
  ];

  userList: UserType[] = [];
  dataSource = new MatTableDataSource<UserType>();
  filteredUserList: UserType[] = [];

  constructor(private userListService: UserListService) {
    this.userListService.getUserFromServer().then((users) => {
      this.dataSource.data = users;
      this.userList = users;
      this.filterUserList('');

      //Filter Form Control
      this.filterFormControl.valueChanges.pipe(debounceTime(800)).subscribe({
        next: (value) => {
          console.log(value);
          this.filterUserList(value);
        },
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.tablePaginator;
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

  filterUserList(name: string) {
    this.filteredUserList = [];

    //Filter Method
    this.filteredUserList = this.userList.filter((u) =>
      u.name.toLowerCase().includes(name.toLowerCase()),
    );

    this.dataSource.data = this.filteredUserList;

    //For Each
    //     this.userList.forEach((user) => {
    //       const userNameLC = user.name.toLowerCase();
    //       if (userNameLC.includes(name.toLowerCase())) {
    //         this.filteredUserList.push(user);
    //       }
    //     });
  }
}
