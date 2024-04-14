/** Importing */
import { Component, OnInit } from '@angular/core';
/** Importing Self-Made Components */
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
/** Importing Material */
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss'],
    standalone: true,
    imports: [MatButtonModule]
})
export class WelcomePageComponent implements OnInit {

  /**
   * constructor makes MatDialog available to use through this.dialog
   * @param dialog 
   */
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /** Opens the dialog when the 'Sign up' button is clicked */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /** Opens the dialog when the 'Login' button is clicked */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}