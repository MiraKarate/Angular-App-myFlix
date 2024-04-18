import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieCardComponent } from './movie-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieCardComponent, MatDialogModule, MatSnackBarModule, RouterTestingModule, HttpClientTestingModule],
      providers: [FetchApiDataService]
    });
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
