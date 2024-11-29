import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
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
import { AppDrawerService } from '../../../app-frame/components/app-drawer/app-drawer.service';
import { UserListFilterComponent } from './user-list-filter/user-list-filter.component';
import { ChartComponentComponent } from '../components/chart-component/chart-component.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropCdkComponentComponent } from '../components/drag-drop-cdk-component/drag-drop-cdk-component.component';

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
    MatTabsModule,
    //Components
    TableFirstLastComponent,
    TablePagesComponent,
    ChartComponentComponent,
    DragDropCdkComponentComponent,
  ],
  host: {
    class: 'app-host',
  },
})
export class UserListComponent implements AfterViewInit, OnDestroy {
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
    'occupation',
    'menu',
  ];

  displayedColumns2: string[] = ['religion', 'address'];

  userList: UserType[] = [];
  dataSource = new MatTableDataSource<UserType>();
  filteredUserList: UserType[] = [];

  constructor(
    private userListService: UserListService,
    private appDrawerService: AppDrawerService,
  ) {
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
  ngOnDestroy() {
    this.appDrawerService.setDrawerWidth();
    this.appDrawerService.setPortalComponent(null);
    this.appDrawerService.closeDrawer();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.tablePaginator;

    // setTimeout(() => {
    //   this.openPortal();
    // });
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

  openDrawer() {
    this.appDrawerService.openDrawer();
  }

  openPortal() {
    this.appDrawerService.setDrawerWidth('400px');
    this.appDrawerService.setPortalComponent(UserListFilterComponent);
    this.appDrawerService.openDrawer();
  }
}
