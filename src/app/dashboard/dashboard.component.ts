import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models';
import { SidebarService } from '../services/sidebar/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user!: User;
  isScreenWidthGreaterThan500 = window.innerWidth > 500;


  constructor(private authService: AuthService,public sidebarService:SidebarService) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.authService.getUser().subscribe(
        (data) => {
          this.user = data;
          this.user.name = this.capitalizeFirstLetter(this.user.name);
          this.user.lastName = this.capitalizeFirstLetter(this.user.lastName);

        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isScreenWidthGreaterThan500 = (event.target as Window).innerWidth > 500;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}

