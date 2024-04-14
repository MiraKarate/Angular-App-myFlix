import { Component, OnInit, Input } from '@angular/core';
/**Use this import to close the dialog on success*/
import { MatDialogRef } from '@angular/material/dialog';
/**This import brings in the API calls*/
import { FetchApiDataService } from '../fetch-api-data.service';
/**Import is used to display notifications back to the user*/
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

/** @Component - Angular component decorator to declare a new component */
@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss'],
    standalone: true,
    imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})

/** @UserLoginFormComponent - class is defined and is set to implement the OnInit interface 
   * @userData - object of the input property, taking Username and Password properties
   * This function is responsible for sending the form inputs to the backend
  */
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  /** 
   * @constructor - injects dependencies into the UserLoginFormComponent
   * @param FetchApiDataService - used to make calls to the API
   * @param dialogRef - used to call the dialog with input from user login
   * @param snackBar - used for displaying snackbar message that the user has successfully logged in
   * @param router - used to navigate to the welcome screen after user is logged in
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Function responsible for sending the form inputs to the backend
   * If login is successful, user's data and token is stored in local storage
   * Login form modal then closes and user is taken to the list of all movies via the navigation router
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //Logic for a successful user registration goes here
      this.dialogRef.close(); //This will close the modal on success.
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log(result.user);
      localStorage.setItem('token', result.token);
      this.snackBar.open('you\'ve been logged in successfully!', 'OK', {
        duration: 2000
      });

      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}

