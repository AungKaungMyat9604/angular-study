import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDrawerService {
  private drawerStatusSub = new BehaviorSubject<boolean>(false);
  private portalComponentSub = new BehaviorSubject<ComponentType<any> | null>(
    null,
  );
  private drawerWidthSub = new BehaviorSubject<string>('fit-content');

  constructor() {}

  drawerStatusObservable() {
    return this.drawerStatusSub.asObservable();
  }

  openDrawer() {
    this.drawerStatusSub.next(true);
  }

  closeDrawer() {
    this.drawerStatusSub.next(false);
  }

  //Drawer Width Observe
  drawerWidthObservable() {
    return this.drawerWidthSub.asObservable();
  }
  setDrawerWidth(width: string = 'fit-content') {
    this.drawerWidthSub.next(width);
  }

  //Portal Component Observe
  portalComponentObservable() {
    return this.portalComponentSub.asObservable();
  }

  setPortalComponent(component: ComponentType<any> | null) {
    this.portalComponentSub.next(component);
  }
}
