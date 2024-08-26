import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from '../services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isAuthenticated:boolean=false;
  constructor(private authService: AuthService, private router: Router,private sidebarService:SidebarService) {}

  ngOnInit(): void {
    this.authService.authStatus.subscribe((isAuthenticated) => {
      this.isAuthenticated=isAuthenticated
    });
  }

  logOut(): void{
    this.authService.logout();
    alert('Logout success');
    this.router.navigateByUrl('/login');
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

}
