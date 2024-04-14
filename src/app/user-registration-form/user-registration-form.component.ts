/** Importing */
import { Component, OnInit, Input } from '@angular/core';
/**Use this import to close the dialog on success*/
import { MatDialogRef } from '@angular/material/dialog';
/**This import brings in the API calls*/
import { FetchApiDataService } from '../fetch-api-data.service';
/**Import is used to display notifications back to the user*/
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

/** @Component - Angular component decorator to declare a new component */
@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss'],
    standalone: true,
    imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})

/** @UserRegistrationFormComponent - class is defined and is set to implement the OnInit interface 
 * @userData - object of the input property, taking Username, Password, Email and Birthday properties
 * This class handles the registration of the user
*/
export class UserRegistrationFormComponent implements OnInit {

  /** Used to declare userData from the inputs 'user-registration-form.component.html' */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /** 
 * @constructor - injects dependencies into the UserLoginFormComponent
 * @param FetchApiData - used to make calls to the API
 * @param dialogRef - used to call the dialog with input from user registration
 * @param snackBar - used for displaying snackbar message that the user has successfully registered
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /** @ignore */
  ngOnInit(): void {
  }

  /** 
     * This function uses the 'userRegistration()' function 
     * from 'UserRegistrationComponent' and is responsible for 
     * sending the form inputs to the backend
     */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      /** logic for successful user registration */
      this.dialogRef.close(); /** closes the modal on success */
      console.log(result);
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
      /** Logic for unsuccessful user registration*/
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });

    });
  }

}