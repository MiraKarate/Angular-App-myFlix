import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // HttpClientTestingModule importieren
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // MatDialogRef importieren
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // BrowserAnimationsModule importieren
import { MatSnackBarModule } from '@angular/material/snack-bar'; // MatSnackBarModule importieren

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserProfileComponent, HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // MatDialogRef bereitstellen
        { provide: MAT_DIALOG_DATA, useValue: {} } // MAT_DIALOG_DATA bereitstellen
      ]
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
