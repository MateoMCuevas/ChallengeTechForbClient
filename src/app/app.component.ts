import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SidebarService } from './services/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template:`<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'ChallengeTechForbClient';
  isScreenWidthGreaterThan500 = window.innerWidth > 500;

  constructor(public sidebarService: SidebarService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isScreenWidthGreaterThan500 = (event.target as Window).innerWidth > 500;
    if (this.isScreenWidthGreaterThan500) {
      this.sidebarService.openSidebar();
    } else {
      this.sidebarService.closeSidebar();
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
