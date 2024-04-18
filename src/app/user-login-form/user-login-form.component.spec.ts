import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // BrowserAnimationsModule importieren
import { HttpClientTestingModule } from '@angular/common/http/testing'; // HttpClientTestingModule importieren
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // MatDialogRef importieren
import { MatSnackBarModule } from '@angular/material/snack-bar'; // MatSnackBarModule importieren

import { UserLoginFormComponent } from './user-login-form.component';

describe('UserLoginFormComponent', () => {
  let component: UserLoginFormComponent;
  let fixture: ComponentFixture<UserLoginFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserLoginFormComponent, HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // MatDialogRef bereitstellen
        { provide: MAT_DIALOG_DATA, useValue: {} } // MAT_DIALOG_DATA bereitstellen
      ]
    });
    fixture = TestBed.createComponent(UserLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
