import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

/** component dispalying the navigation bar */
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule]
})
export class NavigationComponent {

  /**
   * @constructor is used to set dependencies
   * @param router is used to navigate user to different views
   */
  constructor(private router: Router) { }

  ngOnInit(): void { }

  /**
   * user is navigated to movies view
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * user is navigated to profile view
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * user is logged out and navigated to welcome screen
   * token and user data is cleared from local storage
   */
  toLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

}