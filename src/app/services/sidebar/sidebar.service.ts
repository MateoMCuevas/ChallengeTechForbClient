import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isSidebarVisible = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  openSidebar() {
    this.isSidebarVisible = true;
  }

  closeSidebar() {
    this.isSidebarVisible = false;
  }
}
